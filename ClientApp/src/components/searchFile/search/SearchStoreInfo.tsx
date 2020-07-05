import React from "react";
import * as common from "../CommonComponent";
export class ProductInformation extends React.Component {
  public props: any;

  render() {
    const storeInfo = this.props.init.store.current.value;
    if (storeInfo == null) return null;
    const storeDefinition = common.getStoreDefinition(storeInfo.loopValues);
    return (
      <section id="productInfomation" class="proinfo contact section-bg">
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
      </section>
    );
  }
}
