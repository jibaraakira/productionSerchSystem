import * as common from "./SearchCommon";
import { dummy } from "./DummyData";

const enableToEditStore = "enableToEditStore";
const updateStoreInfo = "updateStoreInfo";
const editStore = "editStore";
const createStoreInfo = "createStoreInfo";
const searchProducts = "searchProducts";
const updateProductInfo = "updateProductInfo";
const enableToEditProduct = "enableToEditProduct";
const deleteProductInfo = "deleteProductInfo";
const editProduct = "editProduct";
const memoryProductSearch = "memoryProductSearch";

export const actionCreators = {
  enableToEditStore: () => ({ type: enableToEditStore }),
  updateStoreInfo: () => ({ type: updateStoreInfo }),
  editStore: (valueKeyName, value, index) =>
    common.getInputAction("editStore", valueKeyName, value, index),
  editProduct: (valueKeyName, value, index) =>
    common.getInputAction("editProduct", valueKeyName, value, index),
  memoryProductSearch: (valueKeyName, value, index) =>
    common.getInputAction("memoryProductSearch", valueKeyName, value, index),
  createStoreInfo: () => ({ type: createStoreInfo }),
  searchProducts: () => ({ type: searchProducts }),
  updateProductInfo: () => ({ type: updateProductInfo }),
  enableToEditProduct: (index) => ({ type: enableToEditProduct, index }),
  deleteProductInfo: () => ({ type: deleteProductInfo }),
};

const initialState = new common.stateCreator().getSearchSettingDefault();

class searchReducer {
  constructor(state, action) {
    this.objectCreator = new common.objectCreator();
    this.dum = new dummy();
    // this.array = this.getReducerArray(state, action);
  }

  // getReducerArray(state, action) {
  //   if (
  //     action == null ||
  //     action.type.match(/@@redux/) ||
  //     action.type.match(/@@router/)
  //   )
  //     return [];
  //   return [
  //     { type: "enableToEditStore", method: this.enableToEditStore(state, action) },
  //     {
  //       type: "updateStoreInfo",
  //       method: this.updateStoreInfo(state, action),
  //     },
  //     { type: "editStore", method: this.editStore(state, action) },
  //     { type: "createStoreInfo", method: this.createStoreInfo(state, action) },
  //     { type: "searchProducts", method: this.searchProducts(state, action) },
  //     {
  //       type: "updateProductInfo",
  //       method: this.updateProductInfo(state, action),
  //     },
  //     {
  //       type: "enableToEditProduct",
  //       method: this.enableToEditProduct(state, action),
  //     },
  //     {
  //       type: "deleteProductInfo",
  //       method: this.deleteProductInfo(state, action),
  //     },
  //   ];
  // }
  // getArray() {
  //   reutrn this.array;
  // }

  searchProducts(state, action) {
    return {
      ...state,
      product: {
        ...state.product,
        dataContainer: this.dum.getDummyProductContainer(),
      },
    };
  }

  enableToEditStore(state, action) {
    return {
      ...state,
      store: { ...state.store, canEdit: true },
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
        current: this.objectCreator.convertToDefineObject(
          action.index,
          state.store.dataContainer.logicNames,
          selectedStore
        ),
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
        canEdit: false,
      },
    };
  }
  memoryProductSearch(state, action) {
    if (action == null) return state;

    return [...state, {}];
  }

  createStoreInfo(state, action) {
    if (action == null) return state;

    return [...state, {}];
  }

  enableToEditProduct(state, action) {
    return {
      ...state,
      product: {
        ...state.product,
        current: this.objectCreator.convertToDefineObject(
          action.index,
          state.product.dataContainer.logicNames,
          state.product.dataContainer.valueArray[action.index]
        ),
        canEdit: !state.product.canEdit,
        currentIndex: action.index,
      },
    };
  }

  editProduct(state, action) {
    if (action == null) return state;
    // console.log(`action ${action.value}`);

    let selectedStore = state.product.dataContainer.valueArray[action.index];
    selectedStore[action.valueKeyName] = action.value;

    return {
      ...state,
      product: {
        ...state.product,
        current: this.objectCreator.convertToDefineObject(
          action.index,
          state.product.dataContainer.logicNames,
          selectedStore
        ),
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
        canEdit: false,
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
  console.log();
  // sr.getReducerArray(state, action).forEach((reducer) => {
  //   if (reducer.type === action.type) return reducer.method();
  // });
  // return state;

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

  if (action.type === searchProducts) {
    return sr.searchProducts(state, action);
  }

  if (action.type === memoryProductSearch) {
    return sr.memoryProductSearch(state, action);
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

  return state;
};
