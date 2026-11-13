import Script from "next/script";

/**
 * Google Tag Manager (container owned by Buzz Off, dorrin@spraybuzzoff.com).
 * GA4 (G-P0Y6WVTXLY) and its conversion tags are configured inside the
 * container, not here. Drop once in the root layout.
 *
 * • Loads only on spraybuzzoff.com, so preview deploys and the second Vercel
 *   project never write into the client's Analytics property.
 * • Pushes `phone_click` for every tel: link on the site, including server
 *   rendered ones (city pages, privacy, terms) that can't take an onClick.
 * • `generate_lead` and `book_click` are pushed from src/lib/fbpixel.ts.
 */
export const GTM_ID = "GTM-W9QP9FM7";

export default function GoogleTagManager() {
  return (
    <Script
      id="gtm"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          if (/(^|\\.)spraybuzzoff\\.com$/.test(location.hostname)) {
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
            document.addEventListener('click', function (e) {
              var a = e.target.closest && e.target.closest('a[href^="tel:"]');
              if (a) window.dataLayer.push({ event: 'phone_click', link_url: a.getAttribute('href') });
            });
          }
        `,
      }}
    />
  );
}
