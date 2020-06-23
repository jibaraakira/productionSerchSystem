import * as common from "./SearchCommon";
import { dummy } from "./DummyData";

const searchProduct = "Search";
const selectStore = "selectStore";
const memoryStoreSearch = "memoryStoreSearch";

export const actionCreators = {
  searchProduct: () => ({ type: searchProduct }),
  selectStore: function (key, index) {
    return {
      type: selectStore,
      selectedIndex: index,
      selectedKeyWord: key,
    };
  },
  memoryStoreSearch: () => ({ type: memoryStoreSearch }),
};

const dum = new dummy();
const initial = new common.stateCreator().getSearchDefault();
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
        dataContainer: dum.getDummyStoreContainer(true),
      },
      product: {
        ...state.product,
        dataContainer: dum.getDummyProductContainer(),
      },
    };
  }

  if (action.type === selectStore) {
    let selectedResult = state.searchResult.resultList["list"].find(
      (result) => {
        return result.index === action.selectedIndex;
      }
    );

    return {
      ...state,
      store: {
        ...state.store,
        current: common.getCurrentStore(state, selectedResult),
      },
      product: {
        ...state.product,
        current: common.getCurrentProduct(state, action.selectedIndex),
      },
    };
  }
  if (action.type === memoryStoreSearch) {
  }
  return state;
};
