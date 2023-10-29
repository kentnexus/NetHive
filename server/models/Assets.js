const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const SchemaTypes = mongoose.Schema.Types;
const AssetSchema = mongoose.Schema({
    assetNumber: {
        type: String,
        unique: true
    },
    customer_account: String,
    product: String,
    asset_type: String,
    device_name: String,
    manufacturer: String,
    vendor: String,
    model: String,
    model_version: String,
    serial_number: String,
    ip_address: String,
    snmp_community_string: String,
    location: String,
    owner_name: String,
    contracts_start_dt: Date,
    contracts_end_dt: Date,
    aggregated_to_: String,
    status: String,
    vendor_account_manager: String,
    contact_number: String,
    contact_email: String,
    website: String,
    service_availed: String,
    cost: {
        type: Number,
        get: getPrice,
        set: setPrice
    },
    cost_frequency: String,
    tags: Array,
    notes: String,
    modified_dt: {
        type: Date,
        default: new Date(),
    },
    customer_name: String,
    created_by: String,
    created_dt: {
        type: Date,
        default: new Date(),
    },
}, {
    versionKey: false
});

function getPrice(num){
    return (num.replace("$","")/100).toFixed(2);
}

function setPrice(num){
    return num;
}

module.exports = mongoose.model('Asset', AssetSchema);