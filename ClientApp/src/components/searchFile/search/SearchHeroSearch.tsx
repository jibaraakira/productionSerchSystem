
import React from "react";
export class MainSearch extends React.Component {
	public props: any;

  render() {

    return (
      <article className="mainsearch" id="mainsearch">
        <div className="mainsearch__container">
          <h1>店内商品位置検索サービス</h1>
          <div className="mainsearch__search">
            <input
              type="text"
              className="search__input input--type2"
              name=""
              aria-describedby="helpId"
              placeholder="keyword..."
            />
            <button
              href="#about"
              className="search__button button--search1"
              onClick={this.props.init.searchProduct}
            >
              検索
            </button>
          </div>
        </div>
      </article>
    );
  }
}
