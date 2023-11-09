const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

const SchemaTypes = mongoose.Schema.Types;
const AssetSchema = mongoose.Schema({
<<<<<<< HEAD
    assetNumber: String,
=======
    assetNumber: {
        type: String,
        unique: true
    },
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa
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
<<<<<<< HEAD
    cost: SchemaTypes.Double,
=======
    cost: {
        type: Number,
        get: getPrice,
        set: setPrice
    },
>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa
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

<<<<<<< HEAD
=======
function getPrice(num){
    return (num.replace("$","")/100).toFixed(2);
}

function setPrice(num){
    return num;
}

>>>>>>> 59883238015d0fa4438c49a1728aafd60bba83fa
module.exports = mongoose.model('Asset', AssetSchema);