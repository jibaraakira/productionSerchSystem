import React from "react";
export class SearchStoreByCustomer extends React.Component {
  public props: any;

  selectShop(key, index) {
    this.props.init.selectStore(key, index);
  }

  getResultCards() {
    let props = this.props.init.searchStoreByCustomer.resultList;
    if (props == null) return null;

    return (
      <div>
        <h3 className="result__keywordetitle">{props.searchWord}</h3>
        <div className="row">
          {props["list"].map((ele) => (
            <div className="result__result col-lg-4 col-md-6 filter-web">
              <div
                className="result__item portfolio-item "
                onClick={() => this.selectShop(props["searchWord"], ele.index)}
              >
                <div className="result__img"></div>
                <div className="result__details">
                  <p>{ele.productName}</p>
                  <p>{ele.storeName}</p>
                  <p>{ele.value}円</p>
                  <p>残り：{ele.count}個</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  resultView(resultCards) {
    let searchStoreByCustomer = this.props.init.searchStoreByCustomer;
    if (searchStoreByCustomer.resultList === null) return null;
    if (!searchStoreByCustomer.searchIsDone) return null;
    let length = searchStoreByCustomer.resultList.list.length;
    let resultMessage = (
      <div>
        <h2 className="result__resultMessage">結果件数</h2>
        <h2 className="result__resultMessage">{length}件</h2>
      </div>
    );

    if (length > 0) {
      return (
        <div className="result__keywordresults portfolio-container">
          {resultMessage}
          {resultCards}
        </div>
      );
    } else {
      return (
        <div className="result__keywordresults portfolio-container">
          {resultMessage}
          <h2 className="result__resultMessage">
            残念！キーワードを変えて調べましょう。
          </h2>
        </div>
      );
    }
  }

  render() {
    let searchIsDone = this.props.init.searchStoreByCustomer.searchIsDone;
    let result = searchIsDone ? this.resultView(this.getResultCards()) : null;
    return (
      <article id="searchStoreByCustomer" className="result portfolio">
        <div className="result__container container">
          <div className="result__title section-title">
            <h2>検索結果</h2>
          </div>
          {result}
        </div>
      </article>
    );
  }
}
