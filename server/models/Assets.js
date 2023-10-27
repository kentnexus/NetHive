const mongoose = require('mongoose');

const AssetSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    assetNumber: String,
    ipAddress: String,
    status: Boolean,
    asset_type: String,
    contracts_start_dt: Date,
    contracts_end_dt: Date,
    created_by: String,
    created_dt: Date,
    modified_by: String,
    modified_dt: Date,
    customer_name: String,
    customer_loc: [{
        st_address: String,
        city: String,
        province: String,
        country: String
    }],
    owner_name: String,
    owner_loc: [{
        st_address: String,
        city: String,
        province: String,
        country: String
    }],
    asset_loc: [{
        st_address: String,
        city: String,
        province: String,
        country: String
    }],
    model_name: String,
    model_version: String,
    manufacturer_name: String,
    vendor_name: String,
    vendor_loc: [{
        st_address: String,
        city: String,
        province: String,
        country: String
    }]
});

module.exports = mongoose.model('Asset', AssetSchema);