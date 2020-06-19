import React from "react";
export class HeroSearch extends React.Component {
  render() {
    return (
      <div className="heroSearch-container">
        <h1>店舗商品サーチ</h1>
        <h2>商品があるかを検索しましょう</h2>
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
    );
  }
}
