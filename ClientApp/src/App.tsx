import React from "react";
import { Route } from "react-router";
import Search from "./components/searchFile/search/Search";
import SystemSetting from "./components/searchFile/systemSetting/SearchSetting";
export default () => (
  <div className="">
    <Route exact path="/" component={Search} pathText="/" />
    <Route path="/setting" component={SystemSetting} pathText="/setting" />
  </div>
);
