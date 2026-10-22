"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export type TurnstileHandle = {
  token: () => string;
  reset: () => void;
};

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

let scriptPromise: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  scriptPromise ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => {
      scriptPromise = null;
      reject(new Error("Turnstile script failed to load"));
    };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

/**
 * Invisible Cloudflare Turnstile check. Renders nothing until
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY is set; the server decides what a missing
 * token means.
 */
export function TurnstileWidget({
  theme,
  ref,
}: {
  theme: "light" | "dark";
  ref: Ref<TurnstileHandle>;
}) {
  const el = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef("");

  useImperativeHandle(
    ref,
    () => ({
      token: () => token.current,
      // Tokens are single use, so every submit attempt needs a fresh one.
      reset: () => {
        token.current = "";
        if (widgetId.current) window.turnstile?.reset(widgetId.current);
      },
    }),
    []
  );

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !el.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(el.current, {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          size: "flexible",
          theme,
          callback: (t: string) => {
            token.current = t;
          },
          "expired-callback": () => {
            token.current = "";
          },
        });
      })
      .catch((err) => console.error(err));
    return () => {
      cancelled = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
      token.current = "";
    };
  }, [theme]);

  if (!SITE_KEY) return null;
  // flex: no line box, so it stays 0px tall while hidden. mb-0 cancels the
  // parent's space-y margin so the hidden widget adds no gap.
  return <div ref={el} className="flex mb-0" />;
}
