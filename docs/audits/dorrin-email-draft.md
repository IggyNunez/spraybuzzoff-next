**Subject:** Site speed check on spraybuzzoff.com — quick wins this week

Hi Dorrin,

Wanted to share where the site stands on speed and what I'm tightening up this week.

**The short version: the site is fast.** I ran a full audit across the homepage, services page, the new city pages, reviews, and contact — every page loads in under half a second on desktop, and Google's SEO score came back at a perfect 100 on every single page (both desktop and mobile). The recent city-pages push is doing exactly what we hoped: Rancho Cucamonga actually scores the cleanest of any page on the site.

A few small things I'm cleaning up this week so we don't leave points on the table:

1. **Reviews page is the slowest by a small margin** — about twice as slow as everything else (still well inside Google's "good" zone, but a clear outlier). It's a layout/structure issue, not the network. I'll get it in line with the rest of the site.

2. **Hero images on the services and city pages aren't telling the browser they're important** — one-line code change that should trim a bit off load time across about ten pages.

3. **The booking drawer has a dropdown that screen readers and AI assistants (like ChatGPT, Google's AI Overview) can't read properly.** Quick label fix. This matters more than it used to because AI search is starting to send real traffic — we want our booking flow legible to it.

4. **Adding an `llms.txt` file** — basically a short description of the business written for AI assistants so they know what we do and which cities we serve. New best practice, takes 10 minutes, every page gets a small bump.

5. **Two small accessibility fixes** — a couple of tap targets on mobile are a hair too small, and one page has headings in the wrong order. Boring but real for the score.

One thing worth flagging: our Best Practices score on a few pages sits at 77 instead of 100, but that's entirely because the Meta (Facebook) Pixel uses an API that Google is starting to deprecate. It's a Meta problem, not ours — Meta will update their script and the score will fix itself. Nothing to do on our side.

Full audit report is attached (also lives in the repo at `docs/audits/2026-05-13-site-speed-audit.md` for the technical version). It's a Word doc — should open cleanly in Google Docs or Word.

I'll have all of the above done by end of week. Let me know if you want me to prioritize anything differently, or if there's something else you've been wanting me to look at.

Talk soon,
Ignacio
