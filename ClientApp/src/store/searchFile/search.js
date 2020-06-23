import * as common from "./SearchCommon";
import { dummy } from "./DummyData";

const searchProduct = "Search";
const selectStore = "selectStore";

export const actionCreators = {
  searchProduct: () => ({ type: searchProduct }),
  selectStore: function (key, index) {
    return {
      type: selectStore,
      selectedIndex: index,
      selectedKeyWord: key,
    };
  },
};

const dum = new dummy();
const initial = new common.stateCreator().getSearch();
export const reducer = (state, action) => {
  state = state || initial;

  if (action.type === searchProduct) {
    return {
      ...state,
      searchResult: {
        ...state.searchResult,
        searchIsDone: true,
        resultList: dum.getDummySearchResult(),
      },
      store: {
        ...state.store,
        dataList: dum.getDummyStoreInfo(true),
      },
      product: {
        ...state.product,
        dataList: dum.getDummyProductInfo(),
      }
    };
  }

  if (action.type === selectStore) {
    let selectedResult = state.searchResult.resultList["list"].find((result) => {
      return result.index === action.selectedIndex;
    });

    return {
      ...state,
      store: {
        ...state.store,
        current: common.getCurrentStore(state, selectedResult),
      },
      product: {
        ...state.product,
        current: common.getCurrentProduct(state, action.selectedIndex),
      }
    };
  }

  return state;
};
