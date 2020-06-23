import { dummy } from "./DummyData";
export class objectCreator {
  constructor() {
    this.counterOf = 0;
    this.count = 0;
  }

  createStateObject({ searchResult, store, product } = {}) {
    const stateObject = {
      searchResult,
      store,
      product,
    };
    return stateObject;
  }

  createDataContainerObject({ logicNames, valueArray } = {}) {
    const dataSetObject = {
      logicNames,
      valueArray,
    };
    return dataSetObject;
  }

  createSearchResultItem({
    storeName,
    productName,
    placeName,
    value,
    count,
  } = {}) {
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

  createShopObject({ storeName, address, telephone, url, time } = {}) {
    const shopInfo = {
      storeName,
      address,
      telephone,
      url,
      time,
    };
    return shopInfo;
  }

  createProductObject(
    {
      productName,
      value,
      count,
      commonName,
      expirationDate,
      seller,
      factory,
    } = {},
    indexIsNeed
  ) {
    const shopInfo = {
      productName,
      value,
      count,
      commonName,
      expirationDate,
      seller,
      factory,
    };

    if (indexIsNeed) shopInfo["index"] = this.count++;

    return shopInfo;
  }

  createDefProperty({ mode, current } = {}) {
    return {
      mode,
      current,
    };
  }

  createLoopValues({ keyName, logicName, value } = {}) {
    const loopValues = {
      keyName,
      logicName,
      value,
    };
    return loopValues;
  }

  createDefineObject({ valuesIndex, loopValues } = {}) {
    const define = {
      valuesIndex,
      loopValues,
    };
    return define;
  }

  convertToDefineObject(valuesIndex, logicNames, valueArray) {
    return this.createDefineObject({
      valuesIndex,
      loopValues: Object.keys(logicNames).map((key) => {
        return this.createLoopValues({
          keyName: key,
          logicName: logicNames[key],
          value: valueArray[key],
        });
      }),
    });
  }

  // createProductDefinition(dataset) {
  //   return {
  //     canEditProduct: false,
  //     dataset,
  //   };
  // }

  createEntityState() {
    return {
      canEdit: null,
      current: null,
      currentIndex: null,
      dataContainer: null,
      currentInfoIsNull: null,
    };
  }

  createSearchResult() {
    return {
      searchIsDone: null,
      resultList: null,
      currentStore: null,
      currentProduct: null,
    };
  }

  createSearchResultContainer({ searchWord, list } = {}) {
    return {
      searchWord,
      list,
    };
  }
}

export class stateCreator {
  constructor() {
    this.creator = new objectCreator();
    this.stateOrigin = this.creator.createStateObject({
      searchResult: this.creator.createSearchResult(),
      store: this.creator.createEntityState(),
      product: this.creator.createEntityState(),
    });

    this.dum = new dummy();
  }

  getSearchDefault() {
    return {
      ...this.stateOrigin,
      searchResult: {
        ...this.stateOrigin.searchResult,
        resultList: this.creator.createSearchResultContainer({
          searchWord: "",
          list: [],
        }),
        searchIsDone: false,
      },
    };
  }

  getSearchSettingDefault() {
    let dummyContainer = this.dum.getDummyStoreContainer(true);
    let dummyState = this.stateOrigin;
    Object.assign(dummyState, {
      store: {
        canEdit: false,
        current: this.creator.convertToDefineObject(
          0,
          dummyContainer.logicNames,
          dummyContainer.valueArray[0]
        ),
        currentIndex: 0,
        currentInfoIsNull: false,
        dataContainer: dummyContainer,
      },
    });
    return dummyState;
  }
}

export function getCurrentStore(state, selectedResult) {
  const objCreator = new objectCreator();
  let dataContainer = state.store.dataContainer;
  let storeIndex = dataContainer.valueArray.findIndex((store) => {
    return store.storeName === selectedResult.storeName;
  });

  return objCreator.convertToDefineObject(
    storeIndex,
    dataContainer.logicNames,
    dataContainer.valueArray[storeIndex]
  );
}

export function getCurrentProduct(state, selectedIndex) {
  const objCreator = new objectCreator();
  let dataContainer = state.product.dataContainer;
  let productIndex = dataContainer.valueArray.findIndex((product) => {
    return product.index === selectedIndex;
  });

  return objCreator.convertToDefineObject(
    productIndex,
    dataContainer.logicNames,
    dataContainer.valueArray[productIndex]
  );
}

export function getInputAction(type, valueKeyName, value, index) {
  return Object.assign(
    {},
    {
      type,
      valueKeyName,
      value,
      index,
    }
  );
}
