import React from "react";
import { Route } from "react-router";
import Search from "./components/searchFile/search/Search";
import Setting from "./components/searchFile/searchSetting/SearchSetting";
export default () => (
  <div class="">
    <Route exact path="/" component={Search} />
    <Route path="/setting" component={Setting} />
  </div>

);
