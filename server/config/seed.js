/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

//var _ = require('lodash');


/**
 * Uncomment pieces as you need them for seeding data, tacky but it works
 */

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
//var fs = require('fs');
//var AppMu = require('../api/AppMu/AppMu.model');
//AppMu.find({}).remove(function() {
//  fs.readFile(__dirname + '/AppMu.json', 'utf8', function(err, data) {
//    if (err) {
//      console.log('error reading file', err);
//      return;
//    }
//    data = JSON.parse(data);
//    var lengthOfData = data.length;
//    for (var i = 0; i < lengthOfData; i++) {
//      var appMu = new AppMu();
//      appMu = data[i];
//      AppMu.create(appMu);
//      console.log('id of created AppMu document is', appMu._id);
//    }
//  });
//});
/* Used to seed the counter record for Pet */
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
/*
  After an initial seed of these users, there is no need for the following
*/
var User = require('../api/user/user.model');
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
