import React from "react";
import { Header } from "./SearchSettingHeader";
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
        <StoreInfo init={this.props} />
        <ProductItems init={this.props} />
      </div>
    );
  }
}

export default connect(
  (state) => state.searchSetting,
  (dispatch) => bindActionCreators(actionCreators, dispatch)
)(Setting);
