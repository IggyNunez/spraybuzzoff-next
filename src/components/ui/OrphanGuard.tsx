"use client";

import { useEffect } from "react";

/**
 * No orphans (client request, Nov 2026): never leave one word alone on the
 * last line of a heading, paragraph, link or label.
 *
 * CSS does most of it (`text-wrap: balance` / `pretty` in globals.css), but
 * CSS cannot fix a short title that wraps as "TERMS & / CONDITIONS": balance
 * picks that split and there is no rule to put the short line on top. The
 * standard fix is a non-breaking space between the last two words, but a
 * fixed one overflows on screens where the pair no longer fits. So this runs
 * after layout, on every resize: it undoes its earlier changes, measures, and
 * glues the last two words only where they fit together on one line.
 *
 * It only changes the space character inside an existing text node, after
 * hydration, so React's markup and the server HTML are untouched.
 */
const SELECTOR =
  "h1,h2,h3,h4,h5,h6,p,li,a,label,dt,dd,figcaption,blockquote,summary,button,span";
const SKIP = "svg,[aria-hidden='true'],.marquee-track,script,style,input,textarea,select,code,pre";
const NBSP = " ";

/** Text nodes this guard changed, with their original text. */
const changed = new Map<Text, string>();

function restore() {
  for (const [node, original] of changed) {
    if (node.isConnected && node.data !== original) node.data = original;
  }
  changed.clear();
}

type Word = { node: Text; start: number; end: number; top: number; width: number };

/** Last two words in an element, with their line position and width. */
function lastTwoWords(el: Element): [Word, Word] | null {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const words: Word[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node as Text;
    const re = /\S+/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text.data))) {
      words.push({ node: text, start: m.index, end: m.index + m[0].length, top: 0, width: 0 });
      if (words.length > 2) words.shift();
    }
  }
  if (words.length < 2) return null;
  for (const w of words) {
    const range = document.createRange();
    range.setStart(w.node, w.start);
    range.setEnd(w.node, w.end);
    const rects = [...range.getClientRects()].filter((r) => r.width > 0);
    if (!rects.length) return null;
    w.top = rects[0].top;
    w.width = rects.reduce((sum, r) => sum + r.width, 0);
  }
  return [words[0], words[1]];
}

function guard() {
  restore();
  const els = document.body.querySelectorAll(SELECTOR);
  // Read everything first, then write, so layout is computed once.
  const fixes: { el: Element; node: Text; at: number }[] = [];
  els.forEach((el) => {
    // Leaf text blocks only: a <p> holding other blocks is handled per child.
    if (el.querySelector("p,li,h1,h2,h3,h4,h5,h6,div,ul,ol")) return;
    if (el.closest(SKIP)) return;
    const cs = getComputedStyle(el);
    if (cs.display === "inline" || cs.display === "none" || cs.whiteSpace.includes("nowrap")) return;
    const width = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (width <= 0) return;
    const pair = lastTwoWords(el);
    if (!pair) return;
    const [prev, last] = pair;
    // Last word already shares its line: nothing to do.
    if (Math.abs(last.top - prev.top) < 2) return;
    // The two must fit side by side or gluing them would overflow.
    if (prev.width + last.width + parseFloat(cs.fontSize) * 0.35 > width) return;
    // Only glue a plain space inside one text node; never across elements.
    if (prev.node !== last.node) return;
    const gap = prev.node.data.slice(prev.end, last.start);
    if (!/^[ \t\n]+$/.test(gap)) return;
    fixes.push({ el, node: prev.node, at: prev.end });
  });
  for (const { node, at } of fixes) {
    if (!changed.has(node)) changed.set(node, node.data);
    const end = node.data.slice(at).search(/\S/) + at;
    node.data = node.data.slice(0, at) + NBSP + node.data.slice(end);
  }
  // Undo any fix that made its block wider than its box.
  for (const { el, node } of fixes) {
    if (el.scrollWidth > el.clientWidth + 1) {
      const original = changed.get(node);
      if (original !== undefined) node.data = original;
    }
  }
}

export function OrphanGuard() {
  useEffect(() => {
    let frame = 0;
    let timer = 0;
    const schedule = (delay = 120) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(guard);
      }, delay);
    };

    schedule(0);
    void document.fonts?.ready.then(() => schedule(0));
    const onResize = () => schedule();
    window.addEventListener("resize", onResize);

    // Route changes and late content (accordions, drawers) add new text.
    // The guard's own edits are characterData changes, which are not observed.
    const observer = new MutationObserver(() => schedule(200));
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      restore();
    };
  }, []);

  return null;
}
