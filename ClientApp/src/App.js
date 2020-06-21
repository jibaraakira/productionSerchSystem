import React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Search from "./components/searchFile/search/Search";
import Setting from "./components/searchFile/searchSetting/SearchSetting";
export default () => (
  <Layout>
    <Route exact path="/" component={Search} />
    <Route path="/setting" component={Setting} />
  </Layout>
);
