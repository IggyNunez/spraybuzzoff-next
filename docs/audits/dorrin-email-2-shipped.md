**Subject:** Site speed fixes are live — here are the numbers

Hi Dorrin,

Everything from earlier this week is now live, and I just finished re-measuring against Google's tools. The results are better than I expected, so I wanted to send you the actual numbers rather than just "it's done."

**The headline:** the review page used to be our slowest by a noticeable margin. It now loads almost twice as fast. **Page load time on the reviews page dropped 45%.**

**The other big win:** every page on the site now scores a **perfect 100/100 on Google's "AI Browsing" measurement** (how readable our pages are to ChatGPT, Google's AI Overview, Perplexity, etc.). We were sitting between 33 and 67 before. As more search traffic comes from AI assistants instead of the regular Google results page, this is going to matter more.

**Accessibility scores also jumped:**

- Homepage: 90 → **100** (perfect)
- Services: 90 → 96
- City pages: 94 → **100** (perfect)
- Reviews: 90 → 96
- Contact: 88 → **96**

SEO was already at 100 on every page and stayed there. Page-shift score (the one that measures things jumping around as the page loads) was already perfect and stayed perfect.

**One thing to flag for your awareness:** there's a "Best Practices" score that's stuck at 81 instead of 100, on every page. That's because the Meta (Facebook) tracking pixel uses an old API that Google flags. It's a Meta problem — they'll fix it in their next pixel update. Nothing to do on our side. I just want you to know what you're looking at if you ever pull these numbers yourself.

The full technical report is in the repo (`docs/audits/2026-05-13-site-speed-audit-after.md`) for anyone who wants the deep dive, but the summary is: every fix worked, and the one thing I was unsure about (whether the review page needed a bigger structural rewrite) turned out to be solved by the simpler fix.

Let me know if anything comes up.

Talk soon,
Ignacio
