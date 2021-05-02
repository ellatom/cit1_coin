import axios from 'axios';


async function getData() {

  try {
    const instance = axios.create({ baseURL: `https://web3api.io` });
    const options = {
      method: 'GET',
      headers: { 'x-api-key': 'UAKe9c8b7df965c572d4cafd0cfd316f3d7' }
    };
    const response = await instance.get(`/api/v2/market/spot/ohlcv/eth_usd/latest`, options);
    return response.data.payload;
  }
  catch (ex) {
    console.error(ex);
  }
}

let data = await getData();

let arrPrices = [];

function filterByKey(data, provider) {

  for (let item in data) {
    if (item === provider)
      return data[item];

  }
}

function getArbitrage(providerA, providerB, data) {

  let resultA = filterByKey(data, providerA);
  let resultB = filterByKey(data, providerB);

  let avgPriceProviderA = getAVGPrice(resultA);
  let avgPriceProviderB = getAVGPrice(resultB);

  return Math.abs(avgPriceProviderB - avgPriceProviderA);
}
function getAVGPrice(result){
    return (result.high + result.low) / 2
}
function getProvidersAvgPrice(arrPrices) {
  for (const property in data) {
    arrPrices.push({ provider: property, price: (data[property].high + data[property].low) / 2 })
  }
}

function sortArrayOfObjectsByValue(arrPrices) {
  arrPrices.sort(function (a, b) {
    return a.price - b.price;
  });
}

console.log(getArbitrage("ftx", "gdax", data));