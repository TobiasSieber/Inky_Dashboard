import { spawn } from 'child_process';
import { setTimeout as wait } from 'timers/promises';
import kill from 'tree-kill'
import puppeteer from 'puppeteer'
const SERVER_PORT = 30080;
const SERVER_URL = `http://localhost:${SERVER_PORT}`;

(async () => {
    // Start the server
    const server = spawn('npm', ['start'], {
        cwd:'/home/topi/Weather/plugins/Weaherly', // Make sure this is your project directory
        shell: true,
        detached: true,
        stdio: 'inherit',
    });
    server.unref();
    console.log('🚀 Server started...');
    await wait(8000); // Wait for server to initialize

    // Take screenshot
    const browser = await puppeteer.launch({
        executablePath:'/usr/bin/chromium-browser',   
        headless: 'new',
        defaultViewport: { width: 640, height: 448 },
    });
console.log("Started server with PID:", server.pid);
    console.log("After Browser")
    const page = await browser.newPage();
    await page.goto(SERVER_URL, { waitUntil: 'networkidle2' });
    await wait(2000); // Let dashboard finish rendering
    console.log("Before Screenshot") 
    await page.screenshot({ path: '/home/topi/Weather/inky/examples/7color/dashboard.png' });
    console.log('📸 Screenshot saved as dashboard.png');

    await browser.close()
kill(server.pid, 'SIGINT');
    console.log("Closed...")
    // Kill the server and all its subprocesses
          
})();
