// Renders scripts/build-pdf.html to MAINTENANCE_PLAN.pdf using Puppeteer.
// Run: npx puppeteer@latest --yes ; then `node scripts/render-pdf.js`
// Or use the runner script that handles the install for you.

const path = require('path');
const fs = require('fs');

(async () => {
  const puppeteer = require('puppeteer');
  const html = fs.readFileSync(path.resolve(__dirname, 'build-pdf.html'), 'utf8');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Load Google Fonts so Bebas Neue / Playfair / DM Sans render correctly.
  const htmlWithFonts = html.replace(
    '<head>',
    `<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@1,400&display=swap" rel="stylesheet">`
  );

  await page.setContent(htmlWithFonts, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('print');

  const out = path.resolve(__dirname, '..', 'BuzzOff_Maintenance_Plan.pdf');
  await page.pdf({
    path: out,
    format: 'Letter',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log('PDF written:', out, '(' + (fs.statSync(out).size / 1024).toFixed(1) + ' KB)');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
