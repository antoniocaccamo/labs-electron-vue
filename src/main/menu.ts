import { app, Menu } from "electron";
import log from 'electron-log/main';

let template: Electron.MenuItemConstructorOptions[] = [
    {
        label: 'Login',
        submenu: [
            {
                label: "Login",
                accelerator: "CommandOrControl+L",
                click :  () => log.info("log in ...")
            },
            {
                label: "Logout",
                accelerator: "CommandOrControl+O"
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: "Copy",
                role: "copy",
                accelerator: "CommandOrControl+C"
            },
            {
                label: "Paste",
                role: "paste",
                accelerator: "CommandOrControl+V"
            }
        ]
    }
];

if (process.platform === 'darwin') {
    const name = 'Labs: ElectroVue';
    template.unshift({
        label: name,
        submenu: [
            {
                label: `About ${name}`,
                role: 'about',
            },
            { type: 'separator' },
            {
                label: 'Services',
                role: 'services',
                submenu: [],
            },
            {
                label: `Hide ${name}`,
                accelerator: 'Command+H',
                role: 'hide',
            },
            {
                label: 'Hide Others',
                accelerator: 'Command+Alt+H',
                role: 'hideOthers',
            },
            {
                label: 'Show All',
                role: 'unhide',
            },
            { type: 'separator' },
            {
                label: `Quit ${name}`,
                accelerator: 'Command+Q',
                click() { app.quit(); },
            },
        ]

    });
}

export default Menu.buildFromTemplate(template);

