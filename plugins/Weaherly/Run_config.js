import { spawn } from 'child_process';
import { setTimeout as wait } from 'timers/promises';
import kill from 'tree-kill'
import puppeteer from 'puppeteer'
import { writeFileSync } from 'fs'; 
const SETTINGS_FILE = '/home/topi/Weather/plugins/Weaherly/public/setting.json'
const SERVER_PORT = 30080;
const SERVER_URL = `http://localhost:${SERVER_PORT}`;

(async () => {
    // Start the server
   try {
        writeFileSync(SETTINGS_FILE, '{}'); // writes empty JSON object
        console.log('🗑 settings.json emptied');
    } catch (err) {
        console.error('Failed to clear settings.json:', err);
        return;
    }

    const server = spawn('npm', ['start'], {
        cwd:'/home/topi/Weather/plugins/Weaherly', // Make sure this is your project directory
        shell: true,
        detached: true,
        stdio: 'inherit',
    });
   

          
})();
