import React from "react";
import * as common from "../SearchCommon";
export class ProductInformation extends React.Component {
  render() {
    let storeInfo = this.props.init.currentStoreInfo;
    if (storeInfo == null) return null;
    const storeDefinition = common.getStoreDefinition(storeInfo.loopValues);
    return (
      <div className="proinfo__container">
        <div className="proinfo__toppertail section-title">
          <h2>お店の詳細</h2>
        </div>
        <div className="proinfo__bottompartial">
          <div className="proinfo__leftpartail">
            <div className="proinfo__map"></div>
          </div>
          <div className="proinfo__rightpartail">
            <div className="proinfo__detail">
              <h3>店舗情報</h3>
              {storeDefinition}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
