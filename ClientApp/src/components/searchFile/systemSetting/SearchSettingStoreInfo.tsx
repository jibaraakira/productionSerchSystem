import React from "react";
import { Card } from "../CommonComponent";
import { CSSTransition } from "react-transition-group";
export class StoreInfo extends React.Component {
  public props: any;

  getStoreMapSetter() {
    return (
      <section className="property__mapsetting">
        <div>
          <CSSTransition
            in={this.props.init.switch}
            timeout={200}
            unmountOnExit
            classNames="my-node"
          >
            <div>I'm a fade Transition!</div>
          </CSSTransition>
          <button type="button" onClick={this.props.init.test}>
            Click to Enter
          </button>
        </div>

        <div className="property__toppertail section-title">
          <h2>店内図</h2>
        </div>
        <div className="property__bottompartial--setting">
          <div className="property__mapcontainer">
            <div className="property__map"></div>
            <div className="property__pointcontrol">
              <div className="property__toppartial">
                <div className="property__current">
                  <dl>
                    <dt>dddd</dt>
                    <dd>llllll</dd>
                  </dl>
                </div>
              </div>
              <div className="property__bottompartial--setting">
                <div className="property__setters">
                  <div className="property__setter">
                    <div className="property__legend">
                      <img
                        src="./assets/img/icon/pin.svg"
                        alt="ピン"
                        className="property__pin"
                      />
                      <p>ピンポイントで位置を決めます</p>
                    </div>
                    <div className="property__buttonsets">
                      <button className="property__button button--insertnormal">
                        追加
                      </button>
                      <button className="property__button button--update">
                        更新
                      </button>
                      <button className="property__button button--delete">
                        削除
                      </button>
                    </div>
                  </div>
                  <div className="property__setter">
                    <div className="property__legend">
                      <div className="property__rangeoutside">
                        <div className="property__rangeinside"></div>
                      </div>
                      <p>範囲を示します</p>
                    </div>
                    <div className="property__buttonsets">
                      <button className="property__button button--insertnormal">
                        追加
                      </button>
                      <button className="property__button button--update">
                        更新
                      </button>
                      <button className="property__button button--delete">
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  // renderInsertedStoreDefinition() {}

  render() {
    const storeMapSetter = this.getStoreMapSetter();
    // const tryCshart = function () { }

    return (
      <article id="shopinfo">
        <h1>店舗情報設定</h1>
        <section className="property__shopdetail contact section-title">
          <h2>店舗詳細</h2>
          <Card init={this.props.init} mode={"store"} />
        </section>
        {storeMapSetter}
        {/* {tryCshart} */}
      </article>
    );
  }
}
