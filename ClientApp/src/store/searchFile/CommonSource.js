import { dummy } from "./DummyData";
export class objectCreator {
  constructor() {
    this.counterOf = 0;
    this.count = 0;
  }

  createStateObject({ searchStoreByCustomer, store, product } = {}) {
    const stateObject = {
      searchStoreByCustomer,
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

  createSearchStoreByCustomerItem({
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

  createEntityState() {
    return {
      canEdit: null,
      current: {
        index: null,
        isNull: null,
        value: null,
      },
      dataContainer: null,
    };
  }

  createSearchStoreByCustomer() {
    return {
      searchIsDone: null,
      resultList: null,
      currentStore: null,
      currentProduct: null,
    };
  }

  createSearchStoreByCustomerContainer({ searchWord, list } = {}) {
    return {
      searchWord,
      list,
    };
  }
  insertEntityState({ canEdit, current, dataContainer } = {}) {
    const createEntityState = {
      canEdit,
      current: {
        index: current.index,
        isNull: current.isNull,
        value: current.value,
      },
      dataContainer,
    };
    return createEntityState;
  }
}

export class stateCreator {
  constructor() {
    this.creator = new objectCreator();
    this.stateOrigin = this.creator.createStateObject({
      searchStoreByCustomer: this.creator.createSearchStoreByCustomer(),
      store: this.creator.createEntityState(),
      product: this.creator.createEntityState(),
    });

    this.dum = new dummy();
  }

  getSearchDefault() {
    return {
      ...this.stateOrigin,
      searchStoreByCustomer: {
        ...this.stateOrigin.searchStoreByCustomer,
        resultList: this.creator.createSearchStoreByCustomerContainer({
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
      store: this.creator.insertEntityState({
        canEdit: false,
        current: {
          index: 0,
          isNull: false,
          value: this.creator.convertToDefineObject(
            0,
            dummyContainer.logicNames,
            dummyContainer.valueArray[0]
          ),
        },
        dataContainer: dummyContainer,
      }),
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
