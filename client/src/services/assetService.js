import axios from "axios";

const KEYS = {
  assets: "assets",
  assetId: "assetId",
};

export const getAssetTypes = () => [
  { id: "1", title: "Hardware" },
  { id: "2", title: "Software" },
];

export function insertAsset(data) {
  let assets = getAssets();
  data["id"] = generateAssetId();
  console.log(data);
  assets.push(data);
  localStorage.setItem(KEYS.assets, JSON.stringify(assets));
}

export function generateAssetId() {
  if (localStorage.getItem(KEYS.assets === null))
    localStorage.setItem(KEYS.assetId, "0");
  var id = parseInt(localStorage.getItem(KEYS.assetId));
  localStorage.setItem(KEYS.assetId, (++id).toString());
  return id;
}

export function getAssets() {
  if (localStorage.getItem(KEYS.assets === null))
    localStorage.setItem(KEYS.assets, JSON.stringify([]));
  return JSON.parse(localStorage.getItem(KEYS.assets));
}

export function fetchAssets() {
  try {
    axios
      .get("/assets")
      .then((response) => {
        const assets = response.data;
        console.log(assets);
        return assets;
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.error(error);
  }
}
