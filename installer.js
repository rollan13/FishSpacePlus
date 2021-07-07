const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

const rootPath = path.join('./');
    const outPath = path.join(rootPath, 'release-builds');

getInstallerConfig()
     .then(createWindowsInstaller)
     .catch((error) => {
     console.error(error.message || error)
     process.exit(1)
 })

function getInstallerConfig () {
    console.log('creating windows installer')
    const rootPath = path.join('./')
    const outPath = path.join(rootPath, 'release-builds')

    return Promise.resolve({
       appDirectory: path.join('FISHSpace-x64'),
       authors: 'Pointwest Innovations Corporation',
       noMsi: true,
       outputDirectory: path.join(outPath, 'windows-installer'),
       exe: 'fishspace.exe',
       setupExe: 'FISHSpaceInstaller.exe'
   })
}