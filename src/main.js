import { app, BrowserWindow, dialog } from 'electron'
import electronUpdater from 'electron-updater'
import path from 'node:path'
import started from 'electron-squirrel-startup'

const { autoUpdater } = electronUpdater

if (started) {
  app.quit()
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    )
  }
}

app.whenReady().then(() => {
  createWindow()

  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...')
  })

  autoUpdater.on('update-available', (info) => {
    console.log('Update available:', info)
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Available',
      message: 'A new update is available and is being downloaded.'
    })
  })

  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available:', info)
  })

  autoUpdater.on('download-progress', (progressObj) => {
    console.log('Download progress:', progressObj.percent)
  })

  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded:', info)
    dialog.showMessageBox({
      type: 'info',
      title: 'Update Ready',
      message: 'The update has been downloaded. The app will restart to install it.'
    }).then(() => {
      autoUpdater.quitAndInstall()
    })
  })

  autoUpdater.on('error', (err) => {
    console.log('Update error:', err)
  })

  autoUpdater.checkForUpdatesAndNotify()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})