import React from "react";
import { Route } from "react-router";
import Search from "./components/searchFile/search/Search";
import Setting from "./components/searchFile/searchSetting/SearchSetting";
export default () => (
  <div className="">
    <Route exact path="/" component={Search} pathText="/" />
    <Route path="/setting" component={Setting} pathText="/setting" />
  </div>
);
