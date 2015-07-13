/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

//var _ = require('lodash');

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var AppMu = require('../api/AppMu/AppMu.model');

//var CPet = require('../api/CPet/CPet.model');

//The following code was used to upload a json file of VMRS brands into mongo
// var fs = require('fs');
// var VmrsBrand = require('../api/VmrsBrand/VmrsBrand.model');
//
// VmrsBrand.find({}).remove(function() {
//   fs.readFile(__dirname + '/VMRS.json', 'utf8', function (err, data) {
//     if (err) {
//       console.log('error reading file', err);
//     return;
//     }
//     data = JSON.parse(data);
//     var lengthOfData = data.length;
//     console.log('length of data is', lengthOfData);
//     for (var i = 0; i < lengthOfData; i++) {
//       var vmrsBrand = new VmrsBrand();
//       //could write vmrsBrand = data[i]
//       //if all is in order, I think
//       vmrsBrand._id = data[i]._id;
//       vmrsBrand.isTemp = data[i].isTemp;
//       vmrsBrand.productCode = data[i].productCode;
//       vmrsBrand.vmrsDescription = data[i].description;
//       vmrsBrand.count = data[i].count;
//       vmrsBrand.products = data[i].products;
//       vmrsBrand.groupList = data[i].groupList;
//       vmrsBrand.typeList = data[i].typeList;
//       vmrsBrand.codeList = data[i].codeList;
//       vmrsBrand.address = data[i].address;
//       vmrsBrand.city = data[i].city;
//       vmrsBrand.state = data[i].state;
//       vmrsBrand.zip = data[i].zip;
//       vmrsBrand.country = data[i].country;
//       vmrsBrand.phones = data[i].phones;
//       vmrsBrand.contacts = data[i].contacts;
//       vmrsBrand.titles = data[i].titles;
//       VmrsBrand.create(vmrsBrand);
//       //console.log('id of created doc is', vmrsBrand._id);
//     }
//   });
// });

// var fs = require('fs');
// var Breed = require('../api/Breed/Breed.model');
// Breed.find({}).remove(function() {
//   fs.readFile(__dirname + '/Breed.json', 'utf8', function (err, data) {
//     if (err) {
//       console.log('error reading file', err);
//     return;
//     }
//     data = JSON.parse(data);
//     var lengthOfData = data.length;
//     for (var i = 0; i < lengthOfData; i++) {
//       var breed = new Breed();
//       breed = data[i];
//       Breed.create(breed);
//       console.log('id of created document is', breed._id);
//     }
//   });
// });

 //var fs = require('fs');
 //var Location = require('../api/Location/Location.model');
 //Location.find({}).remove(function() {
 //  fs.readFile(__dirname + '/Location.json', 'utf8', function(err, data) {
 //    if (err) {
 //      console.log('error reading file', err);
 //      return;
 //    }
 //    data = JSON.parse(data);
 //    var lengthOfData = data.length;
 //    for (var i = 0; i < lengthOfData; i++) {
 //      var location = new Location();
 //      location = data[i];
 //      Location.create(location);
 //      console.log('id of created location document is', location._id);
 //    }
 //  });
 //});
//var fs = require('fs');
//var Inventory = require('../api/Inventory/Inventory.model');
// Inventory.find({}).remove(function() {
//   Inventory.create({
//     _id: '01*NAPAX*1234',
//     nonInventory: false,
//     isActive: true,
//     availQty: 19,
//     lastCost: 59.10
//   }, function() {
//       console.log('finished populating Inventory');
//     }
//   );
// });
//var fs = require('fs');
//var Part = require('../api/Part/Part.model');
// Part.find({}).remove(function() {
//   Part.create({
//     _id: 'NAPAX*1234',
//     vmrsNbr: 'VMRS number here',
//     partType: 'This is a terrific part type',
//     isTemp: true
//   }, function() {
//       console.log('finished populating Parts');
//     }
//   );
// });
Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

AppMu.find({}).remove(function() {
  AppMu.create({
    _id: "menuMain",
    formerId: "MASTER",
    menuTitle: "Main Menu",
    shortDesc: "MASTER",
    menuItems: [
      {
        job: "MECHANIC",
        route: "menuMechanic",
        menuText: "Mechanics Menu",
        shortText : "MECHANIC",
        source: "MENU"
      }, {
        job: "REPAIR.ORDER",
        route: "menuRepairOrder",
        menuText : "Shop Floor Processing",
        shortText : "SHOP FLOOR",
        source: "MENU"
      }, {
        job: "PM",
        route: "menuDemo",
        menuText : "Preventative Maintenance Menu",
        shortText : "PM's",
        source: "MENU"
      }, {
        job: "CAMPAIGN.MENU",
        route: "menuCampaign",
        menuText : "Campaign Menu",
        shortText : "CAMPAIGN",
        source: "MENU"
      }, {
        job: "PARTS",
        route: "menuParts",
        menuText : "Parts Department Activity Menu",
        shortText : "PARTS DEPARTMENT",
        source: "MENU"
      }, {
        job: "PURCHASE.ORDER",
        route: "menuPurchaseOrder",
        menuText : "Purchase Order Processing Menu",
        shortText : "PURCHASE ORDER",
        source: "MENU"
      }, {
        job: "LABOR",
        route: "menuLabor",
        menuText : "Labor Utilization Menu",
        shortText : "LABOR",
        source: "MENU"
      }, {
        job: "FUEL",
        route: "menuFuel",
        menuText : "Fuel Received/Dispensed Menu",
        shortText : "FUEL MANAGEMENT",
        source: "MENU"
      }, {
        job: "EQUIPMENT",
        route: "menuEquipment",
        menuText : "Equipment Menu",
        shortText : "EQUIPMENT",
        source: "MENU"
      }, {
        job: "WARRANTY.MENU",
        route: "menuWarranty",
        menuText : "Warranty Menu",
        shortText : "WARRANTY",
        source: "MENU"
      }, {
        job: "FACILITY",
        route: "menuFacility",
        menuText : "Facility Menu",
        shortText : "FACILITY",
        source: "MENU"
      }, {
        job: "VENDOR",
        route: "menuVendor",
        menuText : "Vendor Information Menu",
        shortText : "VENDOR",
        source: "MENU"
      }, {
        job: "CUSTOMER",
        route: "menuCustomer",
        menuText : "Customer Information Menu",
        shortText : "CUSTOMER/ACCOUNT",
        source: "MENU"
      }, {
        job: "FINANCIAL",
        route: "menuFinancial",
        menuText : "Financial Information Menu",
        shortText : "FINANCIAL",
        source: "MENU"
      }, {
        job: "REPORTS",
        route: "menuReports",
        menuText : "Reports Menu",
        shortText : "REPORTS",
        source: "AP"
      }, {
        job: "NEWINSTALL",
        route: "menuInstallation",
        menuText : "Installation Menu",
        shortText : "INSTALLATION MENU",
        source: "VERB"
      }, {
        job: "UTILITY",
        route: "menuUtility",
        menuText : "Utility Processing Menu",
        shortText : "UTILITY",
        source: "MENU"
      }, {
        job: "USER.MENU",
        route: "menuUser",
        menuText : "User Menu",
        shortText : "USER MENU",
        source: "MENU"
      }, {
        job: "DAYEND.CLOSEOUT",
        route: "menuDayendCloseout",
        menuText : "Day End Housekeeping Menu",
        shortText : "DAY END",
        source: "MENU"
      }]
  });
  AppMu.create({
    _id: "menuMechanic",
    formerId: "MECHANIC",
    menuTitle: "Mechanics Menu",
    shortDesc: "MECHANIC",
    menuItems: [
      {
        job: "RO.ENTRY*1",
        route: "ro",
        menuText: "Open New Repair Order",
        shortText : "NEW R.O.",
        source: "AP"
      }, {
        job: "RO.ENTRY*4",
        route: "ro",
        menuText : "Enter Comments on Repair Order",
        shortText : "COMMENTS",
        source: "AP"
      }, {
        job: "RAPO.ENTRY",
        route: "ro",
        menuText : "Open Road Assist Vendor Repair Order",
        shortText : "ROAD ASSIST RA/PO",
        source: "VERB"
      }, {
        job: "PVCI.REPORT",
        route: "reportPvci",
        menuText : "Pending Work File",
        shortText : "DEFERRED/PENDING WORK",
        source: "VERB"
      }, {
        job: "EQUIPMENT.MAINT*12",
        route: "eq",
        menuText : "Call In/Deferred Work",
        shortText : "ENTER REQUESTS",
        source: "AP"
      }, {
        job: "EDIT.WORKSHEETS",
        route: "ws",
        menuText : "PO Worksheet Maintenance",
        shortText : "PO WORKSHEET",
        source: "VERB"
      }, {
        job: "RO.IN.PROCESS",
        route: "ro",
        menuText : "List All Open Repair Orders",
        shortText : "LIST OPEN",
        source: "VERB"
      }, {
        job: "REPAIR.HISTORY",
        route: "rh",
        menuText : "R.O. History/Statistics",
        shortText : "REPAIR HISTORY",
        source: "VERB"
      }, {
        job: "EQUIPMENT.SYSTEM.HISTORY",
        route: "eq",
        menuText : "Maint. History by VMRS System",
        shortText : "VMRS HISTORY",
        source: "VERB"
      }, {
        job: "RO.PRINT",
        route: "ro",
        menuText : "Print Complete Repair Orders",
        shortText : "COMPLETED R.O.",
        source: "VERB"
      }, {
        job: "FC.MAINT*2",
        route: "fc",
        menuText : "Maintain Fleet Specs by VMRS System",
        shortText : "FLEET SPECS",
        source: "AP"
      }, {
        job: "FFES.REPORT",
        route: "reportFees",
        menuText : "Free Form Equipment Specs Report",
        shortText : "FREE FORM SPECS",
        source: "VERB"
      }, {
        job: "WAND.MAINT",
        route: "wa",
        menuText : "Workstation Bar Code Data Entry",
        shortText : "WORKSTATION DATA ENTRY",
        source: "VERB"
      }, {
        job: "DOWNLOAD.WANDS",
        route: "wa",
        menuText : "Download HHP Wand Data",
        shortText : "DOWNLOAD HHP WAND",
        source: "AP"
      }, {
        job: "PROCESS.WAND.TRANS",
        route: "wa",
        menuText : "Process Wand Transactions",
        shortText : "PROCESS WAND TRANS",
        source: "AP"
      }, {
        job: "EZKILL",
        route: "ez",
        menuText : "EZKill Orphan Process",
        shortText : "KILL ORPHAN PROCESS (EZKILL)",
        source: "VERB"
      }, {
        job: "YARDCHECK",
        route: "menuYardcheck",
        menuText : "Yard Check Menu",
        shortText : "YARD CHECK MENU",
        source: "MENU"
      }]
  });
  AppMu.create({
    _id: "menuParts",
    formerId: "PARTS",
    menuTitle: "Parts Department Activity Menu",
    shortDesc: "PARTS",
    menuItems: [
      {
        job: "RO.ENTRY*9",
        route: "parts2ro",
        menuText: "Issue Parts to Repair Order",
        shortText : "ISSUE PARTS",
        source: "AP"
      }, {
        job: "OE.MENU",
        route: "menuOutsideSales",
        menuText : "Outside Sales Processing Menu",
        shortText : "PARTS SALES",
        source: "MENU"
      }, {
        job: "PARTS.TRANSFER",
        route: "menuParts",
        menuText : "Parts Department Transfer Menu",
        shortText : "TRANSFER PARTS",
        source: "MENU"
      }, {
        job: "INV.MAINT*16",
        route: "menuParts",
        menuText : "Parts Inquiry Status/Availability",
        shortText : "STATUS - PART AVAILABILITY",
        source: "AP"
      }, {
        job: "INV.REPORT",
        route: "menuParts",
        menuText : "Inventory On Hand",
        shortText : "AVAILABLE",
        source: "VERB"
      }, {
        job: "PARTS.IN.PROCESS",
        route: "menuParts",
        menuText : "R.O.Parts In Process",
        shortText : "IN PROCESS",
        source: "VERB"
      }, {
        job: "ALT.PART.MAINT",
        route: "menuParts",
        menuText : "Supersede and Interchangable Parts",
        shortText : "ALTERNATE PART INQUIRY",
        source: "AP"
      }, {
        job: "APN.REPORT",
        route: "menuParts",
        menuText : "Supercede/Interchange Parts Report",
        shortText : "INTERCHANGE PARTS REPORT",
        source: "VERB"
      }, {
        job: "VRMS.MAINT.MENU",
        route: "menuParts",
        menuText : "VRMS / Parts Maintenance Menu",
        shortText : "VMRS SELECT",
        source: "MENU"
      }, {
        job: "PARTS.HOUSEKEEPING",
        route: "menuParts",
        menuText : "Parts Housekeeping Menu",
        shortText : "HOUSEKEEPING - PARTS",
        source: "MENU"
      }, {
        job: "KITS",
        route: "menuParts",
        menuText : "Part Kit Menu",
        shortText : "KIT MENU",
        source: "MENU"
      }, {
        job: "PARTS.DUE.REPORT",
        route: "menuParts",
        menuText : "Parts Required for Upcoming PM's",
        shortText : "PM PARTS REQUIRED",
        source: "VERB"
      }, {
        job: "FEES.REPORT",
        route: "menuParts",
        menuText : "Free Form Equipment Specs Report",
        shortText : "FREE FORM SPECS",
        source: "VERB"
      }, {
        job: "STOCKOUT.REPORT",
        route: "menuParts",
        menuText : "Inventory Reorder Report",
        shortText : "REORDER",
        source: "VERB"
      }, {
        job: "PARTS.ON.ORDER",
        route: "menuParts",
        menuText : "Parts On Order - P.O. ISSUED",
        shortText : "PARTS ON ORDER - P.O.",
        source: "VERB"
      }, {
        job: "PO.ENTRY*9",
        route: "in",
        menuText : "Receive Parts from Purchase Order",
        shortText : "RECEIVE PARTS",
        source: "AP"
      }, {
        job: "INV.MAINT*2",
        route: "in",
        menuText : "Receive Inventory Parts - No P.O.",
        shortText : "RECEIPTS - NO P.O.",
        source: "AP"
      }, {
        job: "PART.STATUS",
        route: "menuParts",
        menuText : "Part Active & Stock Status by Loc Inq",
        shortText : "ACTIVE & STOCK STATUS INQUIRY",
        source: "AP"
      }, {
        job: "PARTS.REPORTS",
        route: "menuParts",
        menuText : "Parts Reports - Display/Print",
        shortText : "PARTS REPORT MENU",
        source: "MENU"
      }, {
        job: "INV.MAINT",
        route: "menuParts",
        menuText : "Parts Inquiry Menu",
        shortText : "PARTS INQUIRY MENU",
        source: "AP"
      }]
  });
  AppMu.create({
    _id: "menuDemo",
    formerId: "DEMO",
    menuTitle: "Main Menu",
    shortDesc: "DEMO",
    menuItems: [
      {
        job: "DEMO1",
        route: "demo",
        menuText: "Maintain Pet Registrations",
        shortText : "Register Pets",
        source: "AP"
      }, {
        job: "DEMO2",
        route: "demo",
        menuText : "Check Pets In or Out",
        shortText : "Check-in",
        source: "AP"
      }, {
        job: "DEMO3",
        route: "demo",
        menuText : "Assign Staff for Playtimes",
        shortText : "Assignments",
        source: "AP"
      }, {
        job: "DEMO4",
        route: "demo",
        menuText : "Schedule Activities",
        shortText : "Schedule",
        source: "AP"
      }, {
        job: "DEMO5",
        route: "menuDemoReports",
        menuText : "Reports Menu",
        shortText : "Reports",
        source: "MENU"
      }]
  });
  // AppMu.create({
  //   _id: "menuDemoReports",
  //   formerId: "DEMOREPORTS",
  //   menuTitle: "Reports Menu",
  //   shortDesc: "REPORTS",
  //   menuItems: [
  //     {
  //       job: "DEMOREPORTS1",
  //       route: "demo",
  //       menuText: "List of Pets by Last Check-in",
  //       shortText : "Report",
  //       source: "AP"
  //     }, {
  //       job: "DEMOREPORTS2",
  //       route: "demo",
  //       menuText : "Summary of Breeds",
  //       shortText : "Report",
  //       source: "AP"
  //     }, {
  //       job: "DEMOREPORTS3",
  //       route: "demo",
  //       menuText : "Staff Schedules",
  //       shortText : "Report",
  //       source: "AP"
  //     }, {
  //       job: "DEMOREPORTS4",
  //       route: "demo",
  //       menuText : "Revenue Received",
  //       shortText : "Report",
  //       source: "AP"
  //     }]
  // });
  AppMu.create({
    _id: "menuStart",
    formerId: "START",
    menuTitle: "What would you like to see?",
    shortDesc: "Starting menu",
    menuItems: [
      {
        job: "START1",
        route: "menuDemo",
        menuText: "Pet SPA Demo",
        shortText : "Menu",
        source: "AP"
      }, {
        job: "START2",
        route: "menuMaster",
        menuText : "Repair Order Demo",
        shortText : "Menu",
        source: "AP"
      }]
  });
});
//
// CPet.find({}).remove(function() {
//   CPet.create({
//     _id: '1',
//     nextId: 1
//   }, function() {
//       console.log('finished populating CPet');
//     }
//   );
// });
User.find({}).remove(function() {
  User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin'
    }, function() {
      console.log('finished populating users');
    }
  );
});
