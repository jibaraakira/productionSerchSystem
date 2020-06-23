import React from "react";
export class SearchResult extends React.Component {
  selectShop(key, index) {
    this.props.init.selectStore(key, index);
  }

  getResultCards() {
    let results = [];
    let props = this.props.init.searchResult.resultList;
    if (props == null) return null;

    props["list"].forEach((ele) => {
      results.push(
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
      );
    });

    return (
      <div>
        <h3 className="result__keywordetitle">{props.searchWord}</h3>
        <div className="row">{results}</div>
      </div>
    );
  }
  resultView(resultCards) {
    let searchResult = this.props.init.searchResult;
    if (searchResult.searchIsDone.length > 0) {
      return (
        <div className="result__keywordresults portfolio-container">
          {resultCards}
        </div>);
    } else {
      return (
        <div className="result__keywordresults portfolio-container">
          <h1>結果は0です</h1>
        </div>);
    }
  }
  render() {
    let searchIsDone = this.props.init.searchResult;
    let result = searchIsDone ? this.resultView(this.getResultCards()) : null;
    return (
      <article id="searchresult" class="result portfolio">
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
