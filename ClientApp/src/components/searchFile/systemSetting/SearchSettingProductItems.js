import React from "react";
import * as common from "../CommonComponent";
import * as storeCommon from "../../../store/searchFile/GlobalSource";

export class ProductItems extends React.Component {
  getProductions() {
    let product = this.props.init.product.dataContainer;

    if (product == null) return null;

    let cards = [];
    for (let index = 0; index < product.valueArray.length; index++) {
      cards.push(
        <common.Card
          key={index}
          init={this.props.init}
          mode={"product"}
          thisDefine={storeCommon.getCurrentProduct(this.props.init, index)}
        />
      );
    }

    return <div className="property__products">{cards}</div>;
  }

  render() {
    let productCards = this.getProductions();
    return (
      <article id="products" className="products">
        <section className="property__productstoppartial">
          <div className="property__title section-title">
            <h1>商品項目</h1>
          </div>
          <div className="property__container">
            <div className="property__productcontroler">
              <h2 className="property__controlindex">新規追加する</h2>
              <button className="property__button button--insertproduct">
                商品を追加する
              </button>
              <h2 className="property__controlindex">既存登録商品の検索</h2>
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
            </div>
          </div>
        </section>
        <section className="property__productsbottompartial">
          {productCards}
        </section>
      </article>
    );
  }
}