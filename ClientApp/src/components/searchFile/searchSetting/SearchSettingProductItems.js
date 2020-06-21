import React from "react";
import * as common from "../SearchCommon";
import * as storeCommon from "../../../store/searchFile/SearchCommon";

export class ProductItems extends React.Component {
  getProductions() {
    let product = this.props.init.product;

    if (product == null) return null;

    let cards = [];
    for (let index = 0; index < product.values.length; index++) {
      let current = storeCommon.getCurrentProduct(this.props.init, index);
      cards.push(
        <common.Card
          init={this.props.init}
          mode={"product"}
          current={current}
        />
      );
    }

    return <div className="property__products">{cards}</div>;
  }

  render() {
    let productCards = this.getProductions();
    return (
      <section id="products" className="products">
        <div className="property__title section-title">
          <h1>商品項目</h1>
        </div>
        <div className="property__container container">
          <div className="property__productcontroler">
            <dl>
              <dt>dddd</dt>
              <dd>
                <button className="property__button button--insertproduct">
                  商品を追加する
                </button>
              </dd>
            </dl>
            <dl>
              <dt>dddd</dt>
              <dd>
                <div className="property__refinesearch">
                  <input
                    type="text"
                    className="input--type3"
                    name=""
                    id=""
                    placeholder="keyword"
                  />
                  <button
                    type="button"
                    className="nav__button button--search2"
                    onClick={this.props.init.searchProducts}
                  >
                    検索
                  </button>
                </div>
              </dd>
            </dl>
          </div>
          {productCards}
        </div>
      </section>
    );
  }
}
