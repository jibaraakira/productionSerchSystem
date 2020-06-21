import { dummy } from "./DummyData";
export class objectCreator {
  constructor() {
    this.counterOf = 0;
    this.coun = 0;
  }
  createDataSetObject() {
    return {
      viewNames: null,
      values: null,
    };
  }

  createSearchResult({ storeName, productName, placeName, value, count } = {}) {
    const resultObj = {
      index: this.counterOf++,
      storeName: storeName,
      productName: productName,
      placeName: placeName,
      value: value,
      count: count,
    };
    return resultObj;
  }

  createShopInfo({ storeName, address, telephone, url, time } = {}) {
    const shopInfo = {
      storeName: storeName,
      address: address,
      telephone: telephone,
      url: url,
      time: time,
    };
    return shopInfo;
  }

  createProductInfo({
    productName,
    value,
    count,
    commonName,
    expirationDate,
    seller,
    factory,
  } = {}) {
    const shopInfo = {
      index: this.coun++,
      productName: productName,
      value: value,
      count: count,
      commonName: commonName,
      expirationDate: expirationDate,
      seller: seller,
      factory: factory,
    };
    return shopInfo;
  }


  
  createDatasets(valuesIndex, valueNames, values) {
    let dataSet = {
      valuesIndex: valuesIndex,
      loopValues: null,
    };
    let loopValues = [];

    Object.keys(valueNames).forEach(function (key) {
      loopValues.push({
        keyName: key,
        valueNames: valueNames[key],
        value: values[key],
      });
    });
    dataSet.loopValues = loopValues;
    return dataSet;
  }
}

export class stateCreator {
  constructor() {
    this.stateOrigin = {
      searchResult: null,
      shopInfo: null,
      currentStoreInfo: null,
      storeInfoIsNone: null,
      canEditStoreSearch: null,
      productInfoIsNone: null,
      canEditProduct: null,
      product: null,
      currentProduct: null,
    };
    this.dum = new dummy();
    this.objectCreator = new objectCreator();
  }

  getSearch() {
    return this.stateOrigin;
  }

  getSearchDefault() {
    let storeInfoDum = this.dum.getDummyStoreInfo(true);
    let dummy = this.stateOrigin;
    Object.assign(dummy, {
      shopInfo: storeInfoDum,
      currentStoreInfo: this.objectCreator.createDatasets(
        0,
        storeInfoDum.valueNames,
        storeInfoDum.values[0]
      ),
      productInfoIsNone: false,
      canEditProduct: false,
      storeInfoIsNone: false,
      canEditStoreSearch: false,
    });
    return dummy;
  }
}

export function getCurrentStore(state, selectedResult) {
  const objCreator = new objectCreator();
  let storeIndex = state.shopInfo.values.findIndex((store) => {
    return store.storeName === selectedResult.storeName;
  });

  return objCreator.createDatasets(
    storeIndex,
    state.shopInfo.valueNames,
    state.shopInfo.values[storeIndex]
  );
}

export function getCurrentProduct(state, selectedIndex) {
  const objCreator = new objectCreator();
  let productIndex = state.product.values.findIndex((product) => {
    return product.index === selectedIndex;
  });
  return objCreator.createDatasets(
    productIndex,
    state.product.valueNames,
    state.product.values[productIndex]
  );
}
