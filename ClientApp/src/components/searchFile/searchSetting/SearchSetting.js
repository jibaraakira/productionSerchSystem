import React from "react";
import { Header } from "../SearchHeader";
import { StoreInfo } from "./SearchSettingStoreInfo";
import { ProductItems } from "./SearchSettingProductItems";
import { actionCreators } from "../../../store/searchFile/searchSettingSub";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export class Setting extends React.Component {
  render() {
    return (
      <div>
        <Header init={this.props} />
        <main>
          <StoreInfo init={this.props} />
          <ProductItems init={this.props} />
        </main>
      </div>
    );
  }
}

export default connect(
  (state) => state.searchSetting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Setting);
