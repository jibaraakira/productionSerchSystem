import React from "react";
import { Card } from "../CommonComponent";
import * as storeCommon from "../../../store/searchFile/GlobalSource";
import { CSSTransition } from "react-transition-group";

export class ProductItems extends React.Component {
  getCreateProduct() {
    if (this.props.init.product.flag.canInsert) {
      return (
        <section className="property__productsbottompartial">
          <Card init={this.props.init} mode={"insert_product"} />
        </section>
      );
    } else {
      return null;
    }
  }

  getProductions() {
    let product = this.props.init.product.dataContainer;

    if (product == null) return null;

    return (
      <CSSTransition timeout={500} classNames="item">
        <div className="property__products">
          {product.valueArray.map((value, index) => (
            <Card
              key={index}
              init={this.props.init}
              mode={"product"}
              thisDefine={storeCommon.getCurrentProduct(this.props.init, index)}
            />
          ))}
        </div>
      </CSSTransition>
    );
  }

  searchProduct = storeCommon.debounce((searchTerm) => {
    this.props.init.scanSearchString(searchTerm);
  }, 700);

  render() {
    let productCards = this.getProductions();

    return (
      <article id="products" className="products">
        <section>
          <div className="property__title section-title">
            <h1>商品項目</h1>
          </div>
        </section>
        <section className="property__productstoppartial">
          <div className="property__container">
            <div className="property__productcontroler">
              <h2 className="property__controlindex">新規追加する</h2>
              <button
                className="property__button button--insertproduct"
                onClick={this.props.init.enableToCreateProduct}
              >
                商品を追加する
              </button>
            </div>
          </div>
          {this.getCreateProduct()}
        </section>
        <section className="property__productstoppartial">
          <div className="property__container">
            <div className="property__productcontroler">
              <h2 className="property__controlindex">既存登録商品の検索</h2>
              <div className="property__refinesearch">
                <input
                  type="text"
                  className="input--type3"
                  name=""
                  id=""
                  placeholder="keyword"
                  onChange={(e) => this.searchProduct(e.target.value)}
                />
              </div>
            </div>
          </div>
          {productCards}
        </section>
      </article>
    );
  }
}
