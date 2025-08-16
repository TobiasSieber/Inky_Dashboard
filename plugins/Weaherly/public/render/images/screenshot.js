const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'], // useful for server environments
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 600 });

    await page.goto('http://localhost:3000', {
        waitUntil: 'networkidle2', // Wait until all network requests are done
        timeout: 40000
    });

    // Optional: wait for chart to render
    await page.waitForSelector('#hourlyChartJS');

    // Take screenshot
    await page.screenshot({ path: 'dashboard.png' });

    await browser.close();
})();
