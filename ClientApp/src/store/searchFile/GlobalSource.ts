/* tslint:disable:no-string-literal */
/* tslint:disable:max-classes-per-file */
import { Dummy } from "./DummyData";
export class ObjectCreator {
  public counterOf: any;
  public count: any;

  constructor() {
    this.counterOf = 0;
    this.count = 0;
  }

  // Cardに表示させる、ProductEntity.logicNamesのオブジェクトのキー追加の判断をする。
  // logicNamesのオブジェクトにあるキーの有無で、、ProductEntity.valueArrayのエンティティの表示を決定する。
  fixEntity(Entity, useBranch, data) {
    Object.keys(useBranch).forEach((key) => {
      if (useBranch[key]) {
        Entity[key] = data[key];
      }
    });
    return Entity;
  }

  createStateObject({
    searchStoreByCustomer,
    searchSavedProduct,
    store,
    product,
  }: any = {}) {
    const stateObject = {
      searchStoreByCustomer,
      searchSavedProduct,
      store,
      product,
    };
    return stateObject;
  }

  createDataContainerObject({ logicNames, valueArray }: any = {}) {
    const dataSetObject = {
      logicNames,
      valueArray,
    };
    return dataSetObject;
  }

  createSearchStoreByCustomerItem(
    { storeName, productName, placeName, value, count, photoUrl }: any = {},
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
    const fixResultObj = this.fixEntity(resultObj, useBranch, {
      photoUrl,
    });
    return fixResultObj;
  }

  createShopEntity(
    { storeName, address, telephone, url, time, photoUrl }: any = {},
    useBranch
  ) {
    const shopInfo = {
      storeName,
      address,
      telephone,
      url,
      time,
    };
    const fixShopInfo = this.fixEntity(shopInfo, useBranch, {
      photoUrl,
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
    }: any = {},
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
    const fixProduct = this.fixEntity(product, useBranch, {
      photoUrl,
    });
    return fixProduct;
  }

  createDefProperty({ mode, current }: any = {}) {
    return {
      mode,
      current,
    };
  }

  createLoopValues({ keyName, logicName, value }: any = {}) {
    const loopValues = {
      keyName,
      logicName,
      value,
    };
    return loopValues;
  }

  createDefineObject({ valuesIndex, loopValues }: any = {}) {
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

  createSearchStoreByCustomerContainer({ searchString, list }: any = {}) {
    return {
      searchString,
      list,
    };
  }

  insertEntityState({ flag, current, dataContainer }: any = {}) {
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
  createCardJsx({ topPartial, button }: any = {}) {
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

export class StateCreator {
  public creator: any;
  public stateOrigin: any;
  public dum: any;

  constructor() {
    this.creator = new ObjectCreator();
    this.stateOrigin = this.creator.createStateObject({
      searchStoreByCustomer: this.creator.createSearchStoreByCustomer(),
      searchSavedProduct: this.creator.createSearchSavedProduct(),
      store: this.creator.createEntityState(),
      product: this.creator.createEntityState(),
    });

    this.dum = new Dummy();
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
    const dummyContainer = this.dum.getDummyStoreContainer(true);
    const dummyState = this.stateOrigin;
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
  const objCreator = new ObjectCreator();
  const dataContainer = state.store.dataContainer;
  const storeIndex = dataContainer.valueArray.findIndex((store) => {
    return store.storeName === selectedResult.storeName;
  });

  return objCreator.convertToDefineObject(
    storeIndex,
    dataContainer.logicNames,
    dataContainer.valueArray[storeIndex]
  );
}

export function getCurrentProduct(state, selectedIndex) {
  const objCreator = new ObjectCreator();
  const dataContainer = state.product.dataContainer;
  return objCreator.convertToDefineObject(
    selectedIndex,
    dataContainer.logicNames,
    dataContainer.valueArray[selectedIndex]
  );
}

export function getBlankProduct(state, selectedIndex) {
  const objCreator = new ObjectCreator();
  const dataContainer = state.product.dataContainer;
  const productIndex = dataContainer.valueArray.findIndex((product) => {
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

export function debounce(fn, interval) {
  let timer: any;
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
