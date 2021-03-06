const { app, BrowserWindow } = require('electron')

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    maximizable: false,
    minWidth: 1100,
    minHeight: 650,
    maxWidth: 1600,
    maxHeight: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#1C1E20',
      symbolColor: 'white'
    }
  })
  mainWindow.setTitle('Ruse Info App')
  mainWindow.setMenuBarVisibility(false)

  await mainWindow.loadFile('./src/index.html')
}

app.whenReady().then(async () => {
  await createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
