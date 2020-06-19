import React from "react";

export class Header extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="logo">店内商品位置検索サービス</h1>
        <nav className="nav-menu">
          <form className="nav__form" action="POST">
            <input
              type="text"
              className="input--type1"
              name=""
              id=""
              aria-describedby="helpId"
              placeholder="name"
            />
            <input
              type="text"
              className="input--type1"
              name=""
              id=""
              aria-describedby="helpId"
              placeholder="password"
            />
            <button type="button" className="nav__button button--login">
              Login
            </button>
          </form>
        </nav>
      </div>
    );
  }
}
