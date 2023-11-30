const mongoose = require('mongoose');
require('mongoose-double')(mongoose); 

const dbSchema = "netcollectordb"

const ServerAssetSchema = mongoose.Schema({
    customer_account: String,
    asset_type: String,
    device_name: String,
    manufacturer: String,
    model: String,
    model_version: String,
    serial_number: String,
    ip_address: String,
    snmp_community_string: String,
    status: String,
}, {
    versionKey: false
});

module.exports = mongoose.model(dbSchema, ServerAssetSchema, dbSchema);