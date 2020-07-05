/* tslint:disable:no-string-literal */
import * as common from "./GlobalSource";
import { Dummy } from "./DummyData";
const searchProduct = "Search";
const selectStore = "selectStore";
const memoryStoreSearch = "memoryStoreSearch";

export const actionCreators = {
  searchProduct: () => ({ type: searchProduct }),
  selectStore: (key, index) => ({
    type: selectStore,
    selectedIndex: index,
    selectedKeyWord: key,
  }),
  memoryStoreSearch: () => ({ type: memoryStoreSearch }),
};

const dum = new Dummy();
const initial = new common.StateCreator().getSearchDefault();
export const reducer = (state, action) => {
  state = state || initial;

  if (action.type === searchProduct) {
    return {
      ...state,
      searchStoreByCustomer: {
        ...state.searchStoreByCustomer,
        searchIsDone: true,
        resultList: dum.getDummySearchStoreByCustomer(),
      },
      store: {
        ...state.store,
        dataContainer: dum.getDummyStoreContainer(true),
      },
      product: {
        ...state.product,
        dataContainer: dum.getDummyProductContainer(),
      },
    };
  }

  if (action.type === selectStore) {
    const selectedResult = state.searchStoreByCustomer.resultList["list"].find(
      (result) => {
        return result.index === action.selectedIndex;
      }
    );

    return {
      ...state,
      store: {
        ...state.store,
        current: {
          ...state.store.current,
          value: common.getCurrentStore(state, selectedResult),
        },
      },
      product: {
        ...state.product,
        current: {
          ...state.product.current,
          value: common.getCurrentProduct(state, action.selectedIndex),
        },
      },
    };
  }
  if (action.type === memoryStoreSearch) {
    return null;
  }
  return state;
};
