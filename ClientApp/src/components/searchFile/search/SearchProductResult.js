import React from "react";
import * as common from "../CommonComponent";
export class ProductResult extends React.Component {
  render() {
    let product = this.props.init.product.current.value;
    if (product == null) return null;
    let productDefinitions = common.getProductDefinitions(product.loopValues);
    return (
      <article class="proinfo__result">
        <div className="proinfo__cards container">
          <div className="proinfo__card--result">
            <div className="proinfo__img"></div>
            {productDefinitions}
          </div>
        </div>
      </article>
    );
  }
}
