import React from "react";
import { actionCreators } from "../../../store/searchFile/SearchStoreByCustomer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Header } from "../SearchHeader";
import { MainSearch } from "./SearchHeroSearch";
import { SearchStoreByCustomer } from "./SearchStoreByCustomer";
import { ProductInformation } from "./SearchStoreInfo";
import { ProductResult } from "./SearchProductResult";

export class Search extends React.Component {
  render() {
    return (
      <div>
        <Header init={this.props} />
        <main>
          <MainSearch init={this.props} />
          <SearchStoreByCustomer init={this.props} />
          <ProductInformation init={this.props} />
          <ProductResult init={this.props} />
        </main>
      </div>
    );
  }
}

export default connect(
  (state) => state.search,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Search);
