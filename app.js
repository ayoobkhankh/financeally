const electron = require('electron')
var Sequelize = require('sequelize')
var db = require('./models/index')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

///////////////////////////////
const fs = require('fs');
const os = require('os');
const ipc = require('electron').ipcMain;
const shell = require('electron').shell;
const {
  dialog
} = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let LoginWindow

function createWindow() {

  // Create the browser window.
  LoginWindow = new BrowserWindow({
    width: 360,
    height: 410,
    resizable: false,
    minimizable: false,
    icon: (__dirname, 'dependancies/images/icon.png')
  })

  // and load the index.html of the app.
  LoginWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/server/Login.html'),
    protocol: 'file:',
    slashes: true,
  }))

  LoginWindow.setMenu(null)

  // Open the DevTools.
  // LoginWindow.webContents.openDevTools()
  // mainWindow.maximize()
  // Emitted when the window is closed.
  LoginWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    LoginWindow = null
  })

  // db.sequelize.sync();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (LoginWindow === null) {
    LoginWindow.webContents.on('did-finish-load', function () {
      // DashboardWindow.maximize()
      const ses = LoginWindow.webContents.session.clearCache(function () { });
      createWindow()
    });

  }

})

// const ipc = require('electron').ipcMain

ipc.on('show_dashboard', function (event, arg) {
  DashboardWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: (__dirname, 'dependancies/images/icon.png')
  })
  const Menu = electron.Menu;
  const menuTemplate = [{
    label: 'Main',
    submenu: [{
      label: 'Company Master',
      click: () => {
        ShowEditMaster();
      }
    }, {
      label: 'Manage Branches',
      click: () => {
        console.log('About Clicked');
      }
    },

    ]
  },
  {
    label: 'Sales',
    submenu: [{
      label: 'POS',
      click: () => {
        POSWindow.show();
      }
    }]
  },
  {
    label: 'Purchases',
    submenu: [{
      label: 'POS',
      click: () => {
        POSWindow.show();
      }
    }]
  }, {
    label: 'Products',
    submenu: [{
      label: 'POS',
      click: () => {
        POSWindow.show();
      }
    }]
  },
  {
    label: 'Party',
    submenu: [{
      label: 'POS',
      click: () => {
        POSWindow.show();
      }
    }]
  },
  {
    label: 'Taxes',
    submenu: [{
      label: 'POS',
      click: () => {
        POSWindow.show();
      }
    }]
  },

  ];
  // and load the index.html of the app.
  DashboardWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/main/dashboard.html'),
    protocol: 'file:',
    slashes: true
  }))
  const menu = Menu.buildFromTemplate(menuTemplate);
  DashboardWindow.setMenu(menu)
  // DashboardWindow.webContents.openDevTools()
  DashboardWindow.webContents.on('did-finish-load', function () {
    DashboardWindow.maximize()
    DashboardWindow.show();
    LoginWindow.close();
  });
})

ipc.on('ShowManageCon', function (event, arg) {
  ManageConWindow = new BrowserWindow({
    width: 700,
    height: 350,
    resizable: false,
    icon: (__dirname, 'dependancies/images/icon.png')
  })
  // and load the index.html of the app.
  ManageConWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/server/ManageConnections.html'),
    protocol: 'file:',
    slashes: true
  }))
  // DashboardWindow.setMenu(null)
  ManageConWindow.webContents.openDevTools()
  ManageConWindow.webContents.on('did-finish-load', function () {
    // DashboardWindow.maximize()
    const ses = ManageConWindow.webContents.session.clearCache(function () { });
    ManageConWindow.setMenu(null)
    ManageConWindow.show();
    // if (AdminLoginWindow.isVisible) {
    //   AdminLoginWindow.close();
    // }
  });
})

ipc.on('ShowManageUsers', function (event, arg) {
  ManageUsersWindow = new BrowserWindow({
    width: 700,
    height: 350,
    resizable: false,
    icon: (__dirname, 'dependancies/images/icon.png')
  })
  // and load the index.html of the app.
  ManageUsersWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/server/ManageUsers.html'),
    protocol: 'file:',
    slashes: true
  }))
  // DashboardWindow.setMenu(null)
  // ManageUsersWindow.webContents.openDevTools()
  ManageUsersWindow.webContents.on('did-finish-load', function () {
    // DashboardWindow.maximize()
    const ses = ManageUsersWindow.webContents.session.clearCache(function () { });
    ManageUsersWindow.setMenu(null)
    ManageUsersWindow.show();
    if (AdminLoginWindow.isVisible) {
      AdminLoginWindow.close();
    }

    // AdminLoginWindow.close();
  });
})

ipc.on('ShowAdminLogin', function (event, arg) {
  AdminLoginWindow = new BrowserWindow({
    width: 400,
    height: 220,
    resizable: false,
    minimizable: false,
    icon: (__dirname, 'dependancies/images/icon.png')
  })
  // and load the index.html of the app.
  AdminLoginWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/server/AdminLogin.html'),
    protocol: 'file:',
    slashes: true
  }))
  // DashboardWindow.setMenu(null)
  // AdminLoginWindow.webContents.openDevTools()
  AdminLoginWindow.webContents.on('did-finish-load', function () {
    // DashboardWindow.maximize()
    const ses = AdminLoginWindow.webContents.session.clearCache(function () {
      AdminLoginWindow.setMenu(null)
      AdminLoginWindow.show();
      AdminLoginWindow.webContents.send('ActionReq', arg);
    });

  });
})

ipc.on('ShowManageParty', function (event, arg) {
  ManagePartyWindow = new BrowserWindow({
    width: 800,
    height: 300,
    resizable: false,
    parent: DashboardWindow,
    icon: (__dirname, 'dependancies/images/icon.png')
  })
  // and load the index.html of the app.
  ManagePartyWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/party/ManageParty.html'),
    protocol: 'file:',
    slashes: true
  }))
  // DashboardWindow.setMenu(null)
  // ManagePartyWindow.webContents.openDevTools()
  ManagePartyWindow.webContents.on('did-finish-load', function () {
    // DashboardWindow.maximize()
    const ses = ManagePartyWindow.webContents.session.clearCache(function () { });
    ManagePartyWindow.setMenu(null)
    ManagePartyWindow.show();
  });
})

ipc.on('ShowManageAdress', function (event, arg) {
  ManageAddressWindow = new BrowserWindow({
    width: 800,
    height: 420,
    resizable: false,
    icon: (__dirname, 'dependancies/images/icon.png')
  })
  // and load the index.html of the app.
  ManageAddressWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/party/ManageBranches.html'),
    protocol: 'file:',
    slashes: true
  }))
  // DashboardWindow.setMenu(null)
  // ManagePartyWindow.webContents.openDevTools()
  ManageAddressWindow.webContents.on('did-finish-load', function () {
    // DashboardWindow.maximize()
    const ses = ManageAddressWindow.webContents.session.clearCache(function () { });
    ManageAddressWindow.setMenu(null)
    ManageAddressWindow.show();
  });
})


ipc.on('ShowManageTax', function (event, arg) {
  ManageTaxWindow = new BrowserWindow({
    width: 800,
    height: 330,
    resizable: false,
    parent: DashboardWindow,
    icon: (__dirname, 'dependancies/images/icon.png')
  })
  // and load the index.html of the app.
  ManageTaxWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/tax/ManageTax.html'),
    protocol: 'file:',
    slashes: true
  }))
  // DashboardWindow.setMenu(null)
  // ManageTaxWindow.webContents.openDevTools()
  ManageTaxWindow.webContents.on('did-finish-load', function () {
    // DashboardWindow.maximize()
    const ses = ManageTaxWindow.webContents.session.clearCache(function () { });
    ManageTaxWindow.setMenu(null)
    ManageTaxWindow.show();
  });
})

ipc.on('ShowManageProduct', function (event, arg) {
  ManageProductWindow = new BrowserWindow({
    width: 840,
    height: 400,
    resizable: false,
    parent: DashboardWindow,
    icon: (__dirname, 'dependancies/images/icon.png')
  })
  // and load the index.html of the app.
  ManageProductWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/products/ManageProducts.html'),
    protocol: 'file:',
    slashes: true
  }))
  // DashboardWindow.setMenu(null)
  // ManageProductWindow.webContents.openDevTools()
  ManageProductWindow.webContents.on('did-finish-load', function () {
    // DashboardWindow.maximize()
    const ses = ManageProductWindow.webContents.session.clearCache(function () { });
    ManageProductWindow.setMenu(null)
    ManageProductWindow.show();
  });
})

ipc.on('ShowPOS', function (event, arg) {
  POSWindow = new BrowserWindow({
    width: 800,
    height: 550,
    icon: (__dirname, 'dependancies/images/icon.png')
    // resizable: false
  })
  // and load the index.html of the app.
  POSWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/sale/pos.html'),
    protocol: 'file:',
    slashes: true
  }))
  // DashboardWindow.setMenu(null)
  // POSWindow.webContents.openDevTools()
  POSWindow.maximize()
  POSWindow.webContents.on('did-finish-load', function () {
    // const ses = POSWindow.webContents.session.clearCache(function () { });
    // DashboardWindow.maximize()
    // POSWindow.setMenu(null)

    POSWindow.show();

  });
})

ipc.on('ShowManagePurchases', function (event, arg) {
  ManagePurchasesWindow = new BrowserWindow({
    width: 800,
    height: 550,
    icon: (__dirname, 'dependancies/images/icon.png')
    // resizable: false
  })
  // and load the index.html of the app.
  ManagePurchasesWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/purchase/ManagePurchases.html'),
    protocol: 'file:',
    slashes: true
  }))
  // DashboardWindow.setMenu(null)
  // POSWindow.webContents.openDevTools()
  ManagePurchasesWindow.maximize()
  ManagePurchasesWindow.webContents.on('did-finish-load', function () {
    // const ses = POSWindow.webContents.session.clearCache(function () {});
    // DashboardWindow.maximize()
    // POSWindow.setMenu(null)

    ManagePurchasesWindow.show();

  });
})

ipc.on('GetSalesId', function (event, arg) {
  windowname = arg[0].window;
  switch (windowname) {
    case "POSWindow":
      POSWindow.webContents.send('RecievedSalesId', arg[0].SalesId);
      break;
  }
  SalesSearchWindow.close();
})


ipc.on('ShowSearchSales', function (event, arg) {
  SalesSearchWindow = new BrowserWindow({
    width: 900,
    height: 650,
    // resizable: false,
    minimizable: false,
    // modal: true,
    icon: (__dirname, 'dependancies/images/icon.png')

    // parent: DashboardWindow
  })
  // and load the index.html of the app.
  SalesSearchWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/sale/SearchSales.html'),
    protocol: 'file:',
    slashes: true,
  }))
  // DashboardWindow.setMenu(null)
  // SalesSearchWindow.webContents.openDevTools()
  SalesSearchWindow.webContents.on('did-finish-load', function () {
    const ses = SalesSearchWindow.webContents.session.clearCache(function () { });
    // DashboardWindow.maximize()
    SalesSearchWindow.setMenu(null)
    // SalesSearchWindow.maximize()
    SalesSearchWindow.show();
    SalesSearchWindow.webContents.send('SendFrom', arg);
  });
})

function ShowEditMaster() {
  if (EditMasterWindow) {
    EditMasterWindow.focus();
  } else {
    var EditMasterWindow = new BrowserWindow({
      width: 800,
      height: 350,
      icon: (__dirname, 'dependancies/images/icon.png')
      // resizable: false
    })
    // and load the index.html of the app.
    EditMasterWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'app/master/EditMaster.html'),
      protocol: 'file:',
      slashes: true
    }))
    // EditMasterWindow.setMenu(null)
    // EditMasterWindow.webContents.openDevTools()

    EditMasterWindow.webContents.on('did-finish-load', function () {
      const ses = EditMasterWindow.webContents.session.clearCache(function () { });
      // DashboardWindow.maximize()
      EditMasterWindow.setMenu(null)
      // EditMasterWindow.maximize()

      EditMasterWindow.show();
    });
  }
}

ipc.on('ShowEditBanks', function (event, arg) {
  ShowEditBanks();
})

function ShowEditBanks() {
  if (EditBanksWindow) {
    EditBanksWindow.focus();
  } else {
    var EditBanksWindow = new BrowserWindow({
      width: 800,
      height: 350,
      icon: (__dirname, 'dependancies/images/icon.png')
      // resizable: false
    })
    // and load the index.html of the app.
    EditBanksWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'app/master/ManageBanks.html'),
      protocol: 'file:',
      slashes: true
    }))
    // EditMasterWindow.setMenu(null)
    // EditBanksWindow.webContents.openDevTools()

    EditBanksWindow.webContents.on('did-finish-load', function () {
      const ses = EditBanksWindow.webContents.session.clearCache(function () { });
      // DashboardWindow.maximize()
      EditBanksWindow.setMenu(null)
      // EditMasterWindow.maximize()

      EditBanksWindow.show();
    });
  }
}

ipc.on('ShowEditMaster', function (event, arg) {
  ShowEditMaster();
})


ipc.on('OpenSelectLogoDlg', function (event, path) {
  dialog.showOpenDialog({
    filters: [{
      name: 'PNG',
      extensions: ['PNG']
    }]
  }, function (fileNames) {
    // fileNames is an array that contains all the selected 
    if (fileNames === undefined) {
      console.log("No file selected");

    } else {
      EditMasterWindow.webContents.send('Logofilepath', fileNames[0]);
    }
  });
});

ipc.on('OpenSelectSignDlg', function (event, path) {
  dialog.showOpenDialog({
    filters: [{
      name: 'PNG',
      extensions: ['PNG']
    }]
  }, function (fileNames) {
    // fileNames is an array that contains all the selected 
    if (fileNames === undefined) {
      console.log("No file selected");

    } else {
      EditMasterWindow.webContents.send('Signfilepath', fileNames[0]);
    }
  });
});

ipc.on('ShowEditMasterAddress', function (event, arg) {
  EditMasterAddressWindow = new BrowserWindow({
    width: 800,
    height: 420,
    resizable: false,
    icon: (__dirname, 'dependancies/images/icon.png')
  })
  // and load the index.html of the app.
  EditMasterAddressWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/master/ManageAddress.html'),
    protocol: 'file:',
    slashes: true
  }))
  EditMasterAddressWindow.setMenu(null)
  // EditMasterAddressWindow.webContents.openDevTools()
  EditMasterAddressWindow.webContents.on('did-finish-load', function () {
    const ses = EditMasterAddressWindow.webContents.session.clearCache(function () { });
    // DashboardWindow.maximize()
    // EditMasterWindow.setMenu(null)
    // EditMasterWindow.maximize()
    EditMasterAddressWindow.show();

  });
})

// ipc.on('Printtest', function (event, arg) {

//   const pdfpath = path.join(os.tmpdir(), 'print.pdf');

//   PrintTestWindow = new BrowserWindow({
//     width: 595,
//     height: 842
//     // show: false
//     // resizable: false
//   })
//   // and load the index.html of the app.
//   PrintTestWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'app/server/printtest.html'),
//     protocol: 'file:',
//     slashes: true
//   }))
//   PrintTestWindow.setMenu(null)

//   PrintTestWindow.webContents.openDevTools()
//   PrintTestWindow.webContents.on('did-finish-load', function () {
//     PrintTestWindow.webContents.send('GetInvNo', arg);
//     //   PrintTestWindow.webContents.printToPDF({
//     //     pageSize: 'A4',

//     //   }, function (error, data) {
//     //     if (error) return console.log(error.message);

//     //     fs.writeFile(pdfpath, data, function (err) {
//     //       if (err) return console.log(err.message);
//     //       shell.openExternal('file://' + pdfpath)
//     //     })
//     //   });
//     //   // const ses = PrintTestWindow.webContents.session.clearCache(function () {});
//     //   // // DashboardWindow.maximize()
//     //   // // EditMasterWindow.setMenu(null)
//     //   // // EditMasterWindow.maximize()
//     //   // PrintTestWindow.show();

//   });


// })

ipc.on('StartPrintNow', function (event, arg) { })

ipc.on('logoff', function (event, arg) {
  app.quit()
})

ipc.on('PrevPrintInvoice', function (event, arg) {

  PrintTestWindow = new BrowserWindow({
    width: 840,
    height: 600,
    resizable: false,
    icon: (__dirname, 'dependancies/images/icon.png')
  })
  // and load the index.html of the app.
  PrintTestWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/sale/printtest.html'),
    protocol: 'file:',
    slashes: true
  }))
  PrintTestWindow.setMenu(null)

  // PrintTestWindow.webContents.openDevTools()
  PrintTestWindow.webContents.on('did-finish-load', function () {

    const ses = PrintTestWindow.webContents.session.clearCache(function () {
      PrintTestWindow.show()
      PrintTestWindow.webContents.send('SalesIdIs', arg);
    });

    //   //Code for pdf print
    //   const pdfpath = path.join(os.tmpdir(), 'print.pdf');
    //   PrintTestWindow.webContents.printToPDF({
    //     pageSize: 'A4',
    //     printBackground: true
    //   }, function (error, data) {
    //     if (error) return console.log(error.message);

    //     fs.writeFile(pdfpath, data, function (err) {
    //       if (err) return console.log(err.message);
    //       shell.openExternal('file://' + pdfpath)
    //     })
    //     PrintTestWindow.webContents.send('SalesIdIs', 0);
    //     // PrintTestWindow.close();

    //   });
    //   //Code for pdf print
  })



});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.