import React from "react";
import * as common from "../SearchCommon";
export class ProductResult extends React.Component {
  render() {

    let product = this.props.init.product.current;
    if (product == null) return null;
    let productDefinitions = common.getProductDefinitions(product.loopValues);
    return (
      <div className="proinfo__cards container">
        <div className="proinfo__card--result">
          <div className="proinfo__img"></div>
          {productDefinitions}
        </div>
      </div>
    );
  }
}
