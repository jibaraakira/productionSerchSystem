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

  createSearchResultItem({ storeName, productName, placeName, value, count } = {}) {
    const resultObj = {
      index: this.counterOf++,
      storeName,
      productName,
      placeName,
      value,
      count,
    };
    return resultObj;
  }

  createShopInfo({ storeName, address, telephone, url, time } = {}) {
    const shopInfo = {
      storeName,
      address,
      telephone,
      url,
      time,
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
      productName,
      value,
      count,
      commonName,
      expirationDate,
      seller,
      factory,
    };
    return shopInfo;
  }

  createDefProperty({
    mode,
    current,
  } = {}) {
    return {
      mode,
      current,
    }
  }

  createDatasets(valuesIndex, valueNames, values) {
    let dataSet = {
      valuesIndex,
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

  createProductDefinition(dataset) {
    return {
      canEditProduct: false,
      dataset,
    }
  }

  createEntityRenderSet() {
    return {
      canEdit: null,
      current: null,
      currentIndex: null,
      dataList: null,
      currentInfoIsNull: null,
    }
  }
  createSerchResult() {
    return {
      resultList: null,
      currentStore: null,
      currentProduct: null,
    }
  }
}

export class stateCreator {
  constructor() {
    this.objectCreator = new objectCreator();
    this.stateOrigin = {
      searchResult: this.objectCreator.createSerchResult(),
      nshop: this.objectCreator.createEntityRenderSet(),
      product: this.objectCreator.createEntityRenderSet(),
    };
    this.dum = new dummy();

  }

  getSearch() {
    return this.stateOrigin;
  }

  getSearchDefault() {
    let storeInfoDum = this.dum.getDummyStoreInfo(true);
    let dummy = this.stateOrigin;
    Object.assign(dummy, {
      shopInfo: storeInfoDum,
      nshop: {
        canEdit: false,
        current: this.objectCreator.createDatasets(
          0,
          storeInfoDum.valueNames,
          storeInfoDum.values[0]
        ),
        currentIndex: 0,
        currentInfoIsNull: false,
        dataList: storeInfoDum,
      },
    });
    return dummy;
  }
}

export function getCurrentStore(state, selectedResult) {
  const objCreator = new objectCreator();
  let dataList = state.nshop.dataList;
  let storeIndex = dataList.values.findIndex((store) => {
    return store.storeName === selectedResult.storeName;
  });

  return objCreator.createDatasets(
    storeIndex,
    dataList.valueNames,
    dataList.values[storeIndex]
  );
}

export function getCurrentProduct(state, selectedIndex) {

  const objCreator = new objectCreator();
  let dataList = state.product.dataList;
  let productIndex = dataList.values.findIndex((product) => {
    return product.index === selectedIndex;
  });

  return objCreator.createDatasets(
    productIndex,
    dataList.valueNames,
    dataList.values[productIndex]
  );
}
