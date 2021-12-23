const { app, BrowserWindow } = require('electron')

const createWindow = async () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    maximizable: false,
    minWidth: 1000,
    minHeight: 600
  })
  mainWindow.setTitle('Ruse Info App')
  mainWindow.setMenuBarVisibility(false)

  await mainWindow.loadFile('./src/index.html')
  // mainWindow.webContents.openDevTools()

  setTimeout(() =>{
    mainWindow.loadFile('./src/home.html')
  }, 2000)
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
