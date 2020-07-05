/* tslint:disable:no-string-literal */
import React from "react";
import * as common from "./CommonComponent";
export class Header extends React.Component {
  public props: any;

  createForm(selector) {
    if (selector == null) return null;
    const formPattern = [
      {
        path: "/",
        jsx: (
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
        ),
      },
      {
        path: "/setting",
        jsx: (
          <form className="nav__form" action="POST">
            <div className="nav__user">
              <svg
                className="nav__usersvb bi bi-person-fill"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
              </svg>
              <p className="nav__username">何某三郎</p>
            </div>
            <button type="button" className="nav__button button--login">
              Logout
            </button>
          </form>
        ),
      },
    ];
    const resultSet = common.selectJsx(formPattern, "path", selector);
    return resultSet["jsx"];
  }
  render() {
    return (
      <header id="header">
        <div className="lock-container">
          <h1 className="logo animate__flip">梅鉢マーケット</h1>
          <nav className="nav-menu">
            {this.createForm(this.props.init.match.url)}
          </nav>
        </div>
      </header>
    );
  }
}
