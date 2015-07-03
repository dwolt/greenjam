'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var InventorySchema = new Schema({
    // _id first part is location code, second brand, third part number
    // EXAMPLE from IM  01*ABEXX*4515Q
    _id: String,
    // nonInventory and others up to availQty
    // has been moved from Parts (SP) to LocationParts, aka Inventory (IM)
    isInventory: Boolean,
    isActive: Boolean,
    availQty: Number,
    inTransitQty: Number,
    serialCnt: Number,
    lastCost: Number,
    averageCost: Number,
    replaceCost: Number,
    //might want to split out lifoFifoList, e.g. into inventory transactions
    lifoFifoList: [
      {
        dateBuckets: Date,
        costBuckets: Number,
        qtyBuckets: Number,
        refBuckets: String,
        specialChgs: Number,
        specialChgsCost: Number,
        specialChgsCodes: String
      }
    ],
    priceDate: Date,
    lastRoDate: Date,
    physicalDate: Date,
    receiptDate: Date,
    startDate: Date,
    lastVendor: String,
    isTaxable: Boolean,
    max: Number,
    min: Number,
    bin: String,
    req: String,
    coreValue: Number,
    scrapValue: Number,
    rebuildPrice: Number,
    overstockBin: [String],
    onOrderQty: Number,
    primeVendorId: String,
    binLabels: [String],
    overstockLabels: [String],
    lastVendorCost: Number,
    consignmentCode: String,
    snapshotOhQty: Number,
    stampVersion: Number,
    stampCreatedDateTime: Date,
    stampCreatedUser: String,
    stampCreatedProcess: String,
    stampCreatedSession: String,
    stampLastChangeDateTime: Date,
    stampLastChangeUser: String,
    stampLastChangeProcess: String,
    stampLastChangeSession: String
  },
  {
    collection: 'Inventorys'
  });
//inventoryPart is the last two parts of the three part key
InventorySchema.virtual('inventoryPart').get(function() {
  return this._id.substring(this._id.indexOf("*") + 1);
});
//inventoryLocation is the first part of the three-part key
InventorySchema.virtual('inventoryLocation').get(function() {
  return this._id.substring(0,this._id.indexOf("*"));
});
//inventoryBrand is the middle part of the three-part key
InventorySchema.virtual('inventoryBrand').get(function() {
  return this._id.substring(this._id.indexOf("*") + 1, this._id.indexOf("*", this._id.indexOf("*") + 1));
});
//inventoryPartNumber is the last part of the three-part key
InventorySchema.virtual('inventoryPartNumber').get(function() {
  return this._id.substring(this._id.indexOf("*", this._id.indexOf("*") + 1) + 1);
});

InventorySchema.set('toJSON', {
  virtuals: true,
  getters: true
});

InventorySchema.set('toObject', {
  virtuals: true,
  getters: true
});

module.exports = mongoose.model('Inventory', InventorySchema);
