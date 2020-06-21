import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";

//import * as Maps from "./mapStore";
import * as Search from "./searchFile/search";
import * as SearchSetting from "./searchFile/searchSettingSub";
export default function configureStore(history, initialState) {
  const reducers = {
    //maps: Maps.reducer,
    search: Search.reducer,
    searchSetting: SearchSetting.reducer,
  };

  const middleware = [thunk, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  // 開発時には、ブラウザの Redux dev tools 拡張機能がインストールされている場合は、それを使用します。
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (
    isDevelopment &&
    typeof window !== "undefined" &&
    window.devToolsExtension
  ) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
