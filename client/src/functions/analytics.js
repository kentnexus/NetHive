module.exports.cost = async function(data) {

    let totalAssets = 0, totalHW = 0, totalSW = 0

    for (let i=0; i<data.length;i++){
        if(!data[i]['cost']){
            continue;
        }
        totalAssets+=data[i]['cost']

        if(data[i]['asset_type'] == 'Hardware'){
            totalHW+=data[i]['cost']
        } else {
            totalSW+=data[i]['cost']
        }
    }

    return totalAssets
};

module.exports.counts = function(data) {
counts = Object.create(null);
data.forEach(item => {
    counts[item] = counts[item] ? counts[item] + 1 : 1;
});

return counts
}

module.exports.convertArrayToObject = (array, key) => {
const initialValue = {};
return array.reduce((obj, item) => {
  return {
    ...obj,
    [item[key]]: item,
  };
}, initialValue);
}