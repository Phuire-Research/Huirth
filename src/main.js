const { app, BrowserWindow } = require('electron');
const http = require('http');

const createWindow = () => {
    let win = new BrowserWindow({
        width: 1400,
        height: 1000,
        darkTheme: true,
        resizable: false,
        show: false,
        titleBarStyle: 'default',
    });
    win.loadURL('http://localhost:7637')
    win.once('ready-to-show', () => {
        win.show();
    });
    win.on('closed', () => {
        let exit = new BrowserWindow({
            show: false
        });
        exit.loadURL('http://localhost:7637/server/axiumEXIT').then(() => {
            exit.close();
            let final = new BrowserWindow({
                show: false
            });
            final.loadURL('http://localhost:7637/').then(() => {
                final.close();
                final = null;
                exit = null;
                win = null;
                process.exit()
            })
        })
    });
}


app.on('ready', createWindow);