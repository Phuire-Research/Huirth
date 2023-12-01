const { app, BrowserWindow } = require('electron');
const https = require('https');

const createWindow = () => {
    let win = new BrowserWindow({
        width: 1400,
        height: 1000,
        darkTheme: true,
        resizable: false,
        show: false,
        titleBarStyle: 'hidden',
        frame: false,
    });
    win.loadURL('http://localhost:7637')
    win.once('ready-to-show', () => {
        win.show();
    });
    win.on('closed', () => {
        win.
        win = null;
        https.get('http://localhost:7637/axiumEXIT').once('response', ()=> {
            if (window.getChildWindow() !== null) {
                window.nullChildWindow();
            }
            process.exit()
        });
    });
}


app.on('ready', createWindow);