import { dummy } from "./DummyData";
export class objectCreator {
  public counterOf: any;
  public count: any;

  constructor() {
    this.counterOf = 0;
    this.count = 0;
  }

  // Cardに表示させる、ProductEntity.logicNamesのオブジェクトのキー追加の判断をする。
  // logicNamesのオブジェクトにあるキーの有無で、、ProductEntity.valueArrayのエンティティの表示を決定する。
  fixEntity(entity, useBranch, data) {
    Object.keys(useBranch).forEach((key) => {
      if (useBranch[key]) {
        entity[key] = data[key];
      }
    });
    return entity;
  }
  createStateObject({
    searchStoreByCustomer,
    searchSavedProduct,
    store,
    product,
  } = {}) {
    const stateObject = {
      searchStoreByCustomer,
      searchSavedProduct,
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

  createSearchStoreByCustomerItem(
    { storeName, productName, placeName, value, count, photoUrl } = {},
    useBranch
  ) {
    const resultObj = {
      index: this.counterOf++,
      storeName,
      productName,
      placeName,
      value,
      count,
    };
    let fixResultObj = this.fixEntity(resultObj, useBranch, {
      photoUrl: photoUrl,
    });
    return fixResultObj;
  }

  createShopEntity(
    { storeName, address, telephone, url, time, photoUrl } = {},
    useBranch
  ) {
    const shopInfo = {
      storeName,
      address,
      telephone,
      url,
      time,
    };
    let fixShopInfo = this.fixEntity(shopInfo, useBranch, {
      photoUrl: photoUrl,
    });
    return fixShopInfo;
  }

  createProductEntity(
    {
      productName,
      value,
      count,
      commonName,
      expirationDate,
      seller,
      factory,
      photoUrl,
    } = {},
    useBranch,
    indexIsNeed
  ) {
    const product = {
      productName,
      value,
      count,
      commonName,
      expirationDate,
      seller,
      factory,
    };

    if (indexIsNeed) product["index"] = this.count++;
    let fixProduct = this.fixEntity(product, useBranch, {
      photoUrl: photoUrl,
    });
    return fixProduct;
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
      flag: {
        canInsert: false,
        canEdit: false,
        canDelete: false,
      },
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

  createSearchStoreByCustomerContainer({ searchString, list } = {}) {
    return {
      searchString,
      list,
    };
  }

  insertEntityState({ flag, current, dataContainer } = {}) {
    const createEntityState = {
      flag: {
        canInsert: flag.canInsert,
        canEdit: flag.canEdit,
        canDelete: flag.canDelete,
      },
      current: {
        index: current.valuesIndex,
        isNull: current.isNull,
        value: current.value,
      },
      dataContainer,
    };
    return createEntityState;
  }

  createButtonSetting(
    { infoIsNone, canEdit },
    { insertMethod, updateMethod, deleteMethod, saveBtnIsVisible }
  ) {
    return {
      switch: {
        infoIsNone,
        canEdit,
      },
      method: {
        insertMethod,
        updateMethod,
        deleteMethod,
        saveBtnIsVisible,
      },
    };
  }
  createCardJsx({ topPartial, button } = {}) {
    const cardJsx = {
      topPartial,
      button,
    };
    return cardJsx;
  }

  createSearchSavedProduct() {
    return { searchWord: null, valueArray: null };
  }
}

export class stateCreator {
  public creator: any;
  public stateOrigin: any;
  public dum: any;

  constructor() {
    this.creator = new objectCreator();
    this.stateOrigin = this.creator.createStateObject({
      searchStoreByCustomer: this.creator.createSearchStoreByCustomer(),
      searchSavedProduct: this.creator.createSearchSavedProduct(),
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
          searchString: "",
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
        flag: {
          canInsert: false,
          canEdit: false,
          canDelete: false,
        },
        current: {
          valuesIndex: 0,
          isNull: false,
          value: this.creator.convertToDefineObject(
            0,
            dummyContainer.logicNames,
            dummyContainer.valueArray[0]
          ),
        },
        dataContainer: dummyContainer,
      }),
      searchSavedProduct: {
        valueArray: [],
      },
      switch: false,
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
  return objCreator.convertToDefineObject(
    selectedIndex,
    dataContainer.logicNames,
    dataContainer.valueArray[selectedIndex]
  );
}

export function getBlankProduct(state, selectedIndex) {
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

export function getInputAction(type, valueKeyName, string, index) {
  return Object.assign(
    {},
    {
      type,
      valueKeyName,
      string,
      index,
    }
  );
}

export function debounce(fn, interval) {
  var timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn();
    }, interval);
  };
}

// export function debounce(a, b, c) {
//   var d, e;
//   return function () {
//     function h() {
//       (d = null), c || (e = a.apply(f, g));
//     }
//     var f = this,
//       g = arguments;
//     return (
//       clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
//     );
//   };
// }
