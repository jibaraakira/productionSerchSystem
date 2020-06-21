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
      searchResult: dum.getDummySearchResult(),
      shopInfo: dum.getDummyStoreInfo(true),
      product: dum.getDummyProductInfo(),
    };
  }

  if (action.type === selectStore) {
    let selectedResult = state.searchResult["list"].find((result) => {
      return result.index === action.selectedIndex;
    });

    return {
      ...state,
      currentStoreInfo: common.getCurrentStore(state, selectedResult),
      currentProduct: common.getCurrentProduct(state, action.selectedIndex),
    };
  }

  return state;
};
