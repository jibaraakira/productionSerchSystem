import * as common from "./SearchCommon";
import { dummy } from "./DummyData";
const editStoreInfo = "editStoreInfo";
const endToEditStoreInfo = "endToEditStoreInfo";
const insertValue = "insertValue";
const createStoreInfo = "createStoreInfo";
const searchProducts = "searchProducts";
const createProductInfo = "createProductInfo";
const updateProductInfo = "updateProductInfo";
const deleteProductInfo = "deleteProductInfo";

export const actionCreators = {
  editStoreInfo: () => ({ type: editStoreInfo }),
  endToEditStoreInfo: () => ({ type: endToEditStoreInfo }),
  insertValue: (valueKeyName, value, index) =>
    Object.assign(
      {},
      {
        type: insertValue,
        valueKeyName: valueKeyName,
        value: value,
        index: index,
      }
    ),
  createStoreInfo: () => ({ type: createStoreInfo }),
  searchProducts: () => ({ type: searchProducts }),
  createProductInfo: () => ({ type: createProductInfo }),
  updateProductInfo: () => ({ type: updateProductInfo }),
  deleteProductInfo: () => ({ type: deleteProductInfo }),
};

const initialState = new common.stateCreator().getSearchDefault();

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
  //     { type: "editStoreInfo", method: this.editStoreInfo(state, action) },
  //     {
  //       type: "endToEditStoreInfo",
  //       method: this.endToEditStoreInfo(state, action),
  //     },
  //     { type: "insertValue", method: this.insertValue(state, action) },
  //     { type: "createStoreInfo", method: this.createStoreInfo(state, action) },
  //     { type: "searchProducts", method: this.searchProducts(state, action) },
  //     {
  //       type: "createProductInfo",
  //       method: this.createProductInfo(state, action),
  //     },
  //     {
  //       type: "updateProductInfo",
  //       method: this.updateProductInfo(state, action),
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

  editStoreInfo(state, action) {
    if (action == null) return state;
    return {
      ...state,
      canEditStoreSearch: true,
    };
  }

  endToEditStoreInfo(state, action) {
    if (action == null) return state;
    let update = Object.assign({}, state.currentStoreInfo);
    let shopInfo = Object.assign({}, state.shopInfo);

    update.loopValues.forEach((ele) => {
      shopInfo.values[update.valuesIndex][ele.keyName] = ele.value;
    });

    return {
      ...state,
      shopInfo: shopInfo,
      canEditStoreSearch: false,
    };
  }

  insertValue(state, action) {
    if (action == null) return state;
    let selectedStore = Object.assign({}, state.shopInfo.values);

    selectedStore[action.index][action.valueKeyName] = action.value;

    return {
      ...state,
      currentStoreInfo: this.objectCreator.createDatasets(
        action.index,
        state.shopInfo.valueNames,
        selectedStore[action.index]
      ),
    };
  }
  createStoreInfo(state, action) {
    if (action == null) return state;

    return [...state, {}];
  }

  searchProducts(state, action) {
    return {
      ...state,
      product: this.dum.getDummyProductInfo(),
    };
  }

  createProductInfo(state, action) {
    if (action == null) return state;
    return null;
  }

  updateProductInfo(state, action) {
    let flag = state.canEditProduct;
    return {
      ...state,
      canEditProduct: !flag,
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

  // sr.getReducerArray(state, action).forEach((reducer) => {
  //   if (reducer.type === action.type) return reducer.method();
  // });
  // return state;

  if (action.type === editStoreInfo) {
    return sr.editStoreInfo(state, action);
  }

  if (action.type === endToEditStoreInfo) {
    return sr.endToEditStoreInfo(state, action);
  }

  if (action.type === insertValue) {
    return sr.insertValue(state, action);
  }
  if (action.type === createStoreInfo) {
    return sr.createStoreInfo(state, action);
  }

  if (action.type === searchProducts) {
    return sr.searchProducts(state, action);
  }
  if (action.type === createProductInfo) {
    return sr.createProductInfo(state, action);
  }
  if (action.type === updateProductInfo) {
    return sr.updateProductInfo(state, action);
  }
  if (action.type === deleteProductInfo) {
    return sr.deleteProductInfo(state, action);
  }
  return state;
};
