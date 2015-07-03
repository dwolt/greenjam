'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VmrsBrandSchema = new Schema({
    //key with the middle piece of the Parts collection key
    //EXAMPLE from VMRS.SP:
    _id: String,
    isTemp: Boolean,
    productCode: String,
    vmrsDescription: String,
    count: Number,
    products: String,
    groupList: [String],
    typeList: [String],
    codeList: [String],
    address: [String],
    city: String,
    state: String,
    zip: String,
    country: String,
    // I'm guessing the following should be associated, not sure
    phones: [String],
    contacts: [String],
    titles: [String],
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
    collection: 'VmrsBrands'
  });


module.exports = mongoose.model('VmrsBrand', VmrsBrandSchema);
