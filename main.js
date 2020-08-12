const {app, BrowserWindow, globalShortcut} = require('electron')
const config = require('./config')

let win;

function createWindow(){
        win = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: 'hidden',
        autoHideMenuBar: true,
        alwaysOnTop: true,
        webPreferences:{
            nodeIntegration: true
        }
    })

    win.loadURL(config.url)    
}

function toggleDevTools(){
    win.webContents.toggleDevTools()
}

function createShortcuts(){
    globalShortcut.register('F12', toggleDevTools)
}

app.whenReady()
.then(createWindow)
.then(createShortcuts)

app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', ()=>{
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow()
    }
})