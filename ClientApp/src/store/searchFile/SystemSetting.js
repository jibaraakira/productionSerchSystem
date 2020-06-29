import * as common from "./GlobalSource";
import { dummy } from "./DummyData";
import { product } from "./EntityClass";

const createStoreInfo = "createStoreInfo";
const enableToEditStore = "enableToEditStore";
const editStore = "editStore";
const updateStoreInfo = "updateStoreInfo";

const searchProducts = "searchProducts";
const enableToCreateProduct = "enableToCreateProduct";
const createProductInfo = "createProductInfo";
const enableToEditProduct = "enableToEditProduct";
const editProduct = "editProduct";
const updateProductInfo = "updateProductInfo";
const deleteProductInfo = "deleteProductInfo";

const scanSearchString = "scanSearchString";
const test = "test";

export const actionCreators = {
  createStoreInfo: () => ({ type: createStoreInfo }),
  enableToEditStore: () => ({ type: enableToEditStore }),
  updateStoreInfo: () => ({ type: updateStoreInfo }),
  scanSearchString: (string) => ({ type: scanSearchString, string }),
  editStore: (valueKeyName, string, index) =>
    common.getInputAction("editStore", valueKeyName, string, index),
  searchProducts: () => ({ type: searchProducts }),
  enableToCreateProduct: () => ({ type: enableToCreateProduct }),
  createProductInfo: () => ({ type: createProductInfo }),
  enableToEditProduct: (index) => ({ type: enableToEditProduct, index }),
  editProduct: (valueKeyName, string, index) =>
    common.getInputAction("editProduct", valueKeyName, string, index),
  updateProductInfo: () => ({ type: updateProductInfo }),
  deleteProductInfo: () => ({ type: deleteProductInfo }),
  test: () => ({ type: test }),
};

const initialState = new common.stateCreator().getSearchSettingDefault();

class searchReducer {
  constructor() {
    this.objectCreator = new common.objectCreator();
    this.dum = new dummy();
  }
  createStoreInfo(state, action) {
    if (action == null) return state;

    return [...state, {}];
  }

  enableToEditStore(state, action) {
    console.log("ddd");
    return {
      ...state,
      store: {
        ...state.store,
        flag: {
          ...state.flag,
          canEdit: true,
        },
      },
    };
  }

  updateStoreInfo(state, action) {
    if (action == null) return state;
    let update = Object.assign({}, state.store.current.value);
    let shopContainer = Object.assign({}, state.store.dataContainer);

    update.loopValues.forEach((ele) => {
      shopContainer.valueArray[update.valuesIndex][ele.keyName] = ele.value;
    });
    return {
      ...state,
      store: {
        ...state.store,
        dataContainer: shopContainer,
        flag: {
          ...state.flag,
          canEdit: false,
        },
      },
    };
  }

  editStore(state, action) {
    console.log(`editstreo${action.value}`);
    if (action == null) return state;

    let selectedStore = state.store.dataContainer.valueArray[action.index];
    selectedStore[action.valueKeyName] = action.value;

    return {
      ...state,
      store: {
        ...state.store,
        current: {
          ...state.product.current,
          value: this.objectCreator.convertToDefineObject(
            action.index,
            state.store.dataContainer.logicNames,
            selectedStore
          ),
        },
      },
    };
  }

  scanSearchString(state, action) {
    console.log("dddd");
    return {
      ...state,
      searchSavedProduct: {
        ...state.searchSavedProduct,
        searchString: action.string,
      },
    };
  }

  searchProducts(state, action) {
    return {
      ...state,
      product: {
        ...state.product,
        dataContainer: this.dum.getDummyProductContainer(),
      },
    };
  }

  enableToCreateProduct(state, action) {
    console.log("enabel to ");
    let blank = new product().getDataContainer([
      ["", "", "", "", "", "", "", ""],
    ]);
    console.log(blank);
    let index =
      state.product.dataContainer === null
        ? -1
        : ++state.product.dataContainer.valueArray.length;

    return {
      ...state,
      product: {
        ...state.product,
        current: this.objectCreator.convertToDefineObject(
          index,
          blank.logicNames,
          blank.valueArray[0]
        ),
        flag: {
          ...state.product.flag,
          canInsert: true,
          canEdit: true,
        },
      },
    };
  }

  createProductInfo(state, action) {
    if (action == null) return state;
    let update = Object.assign({}, state.product.current.value);

    if (state.product.dataContainer === null) {
      return {
        ...state,
        product: {
          ...state.product,
          current: {
            ...state.product.current,
            valuesIndex: null,
            value: null,
            isNull: null,
          },
          flag: {
            ...state.flag,
            canInsert: false,
            canEdit: false,
          },
        },
      };
    }

    let productContainer = Object.assign({}, state.product.dataContainer);
    productContainer.valueArray.push({});

    update.loopValues.forEach((ele) => {
      productContainer.valueArray[productContainer.valueArray.length - 1][
        ele.keyName
      ] = ele.value;
    });

    return {
      ...state,
      product: {
        ...state.product,
        dataContainer: productContainer,
        flag: {
          ...state.flag,
          canInsert: false,
          canEdit: false,
        },
      },
    };
  }

  enableToEditProduct(state, action) {
    return {
      ...state,
      product: {
        ...state.product,
        current: {
          ...state.product.current,
          value: this.objectCreator.convertToDefineObject(
            action.index,
            state.product.dataContainer.logicNames,
            state.product.dataContainer.valueArray[action.index]
          ),
          valuesIndex: action.index,
        },
        flag: {
          ...state.flag,
          canEdit: !state.product.flag.canEdit,
        },
      },
    };
  }

  editProduct(state, action) {
    if (action == null) return state;
    let updateLoopValues = state.product.current.loopValues;

    updateLoopValues.forEach((ele) => {
      if (ele["keyName"] === action.valueKeyName) {
        ele["value"] = action.value;
      }
    });

    return {
      ...state,
      product: {
        ...state.product,
        current: {
          ...state.product.current,
          value: {
            ...state.string,
            loopValues: updateLoopValues,
          },
        },
      },
    };
  }

  updateProductInfo(state, action) {
    if (action == null) return state;
    let update = Object.assign({}, state.product.current.value);
    let productContainer = Object.assign({}, state.product.dataContainer);

    update.loopValues.forEach((ele) => {
      productContainer.valueArray[state.product.current.value.valuesIndex][
        ele.keyName
      ] = ele.value;
    });

    return {
      ...state,
      product: {
        ...state.product,
        dataContainer: productContainer,
        flag: {
          ...state.flag,
          canEdit: false,
        },
      },
    };
  }

  deleteProductInfo(state, action) {
    if (action == null) return state;
    return null;
  }
}

export const reducer = (state, action) => {
  state = state || initialState;
  let sr = new searchReducer();
  if (action.type === enableToEditStore) {
    return sr.enableToEditStore(state, action);
  }

  if (action.type === updateStoreInfo) {
    return sr.updateStoreInfo(state, action);
  }

  if (action.type === editStore) {
    return sr.editStore(state, action);
  }
  if (action.type === createStoreInfo) {
    return sr.createStoreInfo(state, action);
  }
  if (action.type === scanSearchString) {
    console.log("scanSearchString");
    return sr.scanSearchString(state, action);
  }

  if (action.type === searchProducts) {
    return sr.searchProducts(state, action);
  }
  if (action.type === enableToCreateProduct) {
    return sr.enableToCreateProduct(state, action);
  }
  if (action.type === updateProductInfo) {
    return sr.updateProductInfo(state, action);
  }

  if (action.type === enableToEditProduct) {
    return sr.enableToEditProduct(state, action);
  }

  if (action.type === deleteProductInfo) {
    return sr.deleteProductInfo(state, action);
  }

  if (action.type === editProduct) {
    return sr.editProduct(state, action);
  }

  if (action.type === test) {
    console.log(state.switch);
    return {
      ...state,
      switch: !state.switch,
    };
  }
  if (action.type === createProductInfo) {
    return sr.createProductInfo(state, action);
  }

  return state;
};
