import React from "react";
import * as globalSource from "../../store/searchFile/GlobalSource";

export function selectJsx(jsxArray, keyName, selector) {
  let result = jsxArray.find((index) => {
    return index[keyName] === selector;
  });
  return result;
}

export function createDefinitions(define) {
  return define.map((ele) => (
    <dl>
      <dt>{ele.logicName}</dt>
      <dd>{ele.value}</dd>
    </dl>
  ));
}

export function getStoreDefinition(storeDefine) {
  if (storeDefine == null) return null;

  let definitions = createDefinitions(storeDefine);

  return <div className="proinfo__data--type1">{definitions}</div>;
}

export function getProductDefinitions(productDefine, title) {
  if (productDefine == null) return null;

  let definitions = createDefinitions(productDefine);

  return (
    <div className="proinfo__detail">
      <h3>{title}</h3>
      <div className="proinfo__data--type1">{definitions}</div>
    </div>
  );
}

export class InputDefinition extends React.Component {
  editProduct(event, valueKeyName, valueIndex) {
    console.log(`edit ${event.target.value}`);
    this.props.init.editProduct(valueKeyName, event.target.value, valueIndex);
  }
  editStore(event, valueKeyName, valueIndex) {
    console.log(`store ${event.target.value}`);
    this.props.init.editStore(valueKeyName, event.target.value, valueIndex);
  }

  render() {
    let dataSet = this.props.dataSet;
    if (dataSet == null) return null;

    let insertMethod = function (th, keyName, valuesIndex) {
      if (th.props.mode === "store") {
        return (event) => th.editStore(event, keyName, valuesIndex);
      }

      if (th.props.mode === "product") {
        return (event) => th.editProduct(event, keyName, valuesIndex);
      }
    };

    let data = dataSet.loopValues.map((ele) => (
      <dl>
        <dt>{ele.logicName}</dt>
        <dd>
          <input
            type="text"
            className="search__input input--type3"
            onChange={insertMethod(this, ele.keyName, dataSet.valuesIndex)}
            defaultValue={ele.value}
          />
        </dd>
      </dl>
    ));
    return <div className="proinfo__container">{data}</div>;
  }
}

export class ButtonContainer extends React.Component {
  insertButton() {
    return (
      <div className="property__btncontainer">
        <button
          className="property__button button--insertnormal "
          onClick={this.props.init.enableToEditStore}
        >
          追加
        </button>
      </div>
    );
  }

  renderInsertBtn({ infoIsNone, canEdit } = {}) {
    if (this.props.init == null) {
      return null;
    }

    if (canEdit) {
      return null;
    }

    if (infoIsNone) {
      return this.insertButton();
    } else {
      return null;
    }
  }

  renderBtns({
    insertMethod,
    updateMethod,
    deleteMethod,
    saveBtnIsVisible,
  } = {}) {
    const saveButton = (
      <button
        className="property__button button--update"
        onClick={insertMethod}
      >
        保存する
      </button>
    );

    const updateButton = (
      <div className="property__btncontainer">
        <button
          className="property__button button--update"
          onClick={updateMethod}
        >
          更新
        </button>
        <button
          className="property__button button--delete"
          onClick={deleteMethod}
        >
          削除
        </button>
      </div>
    );

    if (saveBtnIsVisible) {
      return saveButton;
    } else {
      return updateButton;
    }
  }

  render() {
    let setting = this.props.buttonSetting;
    return (
      <div className="property__buttons">
        {this.renderInsertBtn({
          infoIsNone: setting.switch.infoIsNone,
          canEdit: setting.switch.canEdit,
        })}
        {this.renderBtns({
          insertMethod: setting.method.insertMethod,
          updateMethod: setting.method.updateMethod,
          deleteMethod: setting.method.deleteMethod,
          saveBtnIsVisible: setting.method.saveBtnIsVisible,
        })}
      </div>
    );
  }
}

export class Photo extends React.Component {
  render() {
    let photo = (photoUrl) => {
      if (photoUrl === null || photoUrl === "") {
        return (
          <a href="">
            <div className="hovertile__container">
              <div className="hovertile__detail">
                <div className="hovertile__message--icon">
                  <svg
                    className="hovertile__bi-upload"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5A.5.5 0 0 1 .5 8zM5 4.854a.5.5 0 0 0 .707 0L8 2.56l2.293 2.293A.5.5 0 1 0 11 4.146L8.354 1.5a.5.5 0 0 0-.708 0L5 4.146a.5.5 0 0 0 0 .708z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M8 2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 2z"
                    />
                  </svg>
                </div>
                <div className="hovertile__message--info">写真を読み込む</div>
              </div>
            </div>
          </a>
        );
      } else {
        return null;
      }
    };
    return (
      <div className="property__img hovertile">
        {photo(this.props.photoUrl)}
      </div>
    );
  }
}

export class Card extends React.Component {
  renderDefinition(outArgs) {
    const renderProperty = function (props) {
      if (outArgs.mode === "store") {
        return {
          info: props.init.store.current.value,
          canEdit: props.init.store.canEdit,
          isNone: props.init.store.current.isNull,
          title: "",
          class: "proinfo__data--type2",
        };
      }

      if (outArgs.mode === "product") {
        let currentIndex = props.init.product.current.index;
        let canEdit = null;
        if (currentIndex == null) {
          canEdit = props.init.product.canEdit;
        } else {
          canEdit =
            props.init.product.canEdit &&
            outArgs.current.valuesIndex === currentIndex;
        }
        return {
          info: outArgs.current,
          canEdit: canEdit,
          isNone: props.init.product.current.isNull,
          title: "商品詳細",
          class: "proinfo__data--type2",
        };
      }
    };

    let property = renderProperty(this.props);
    if (property.canEdit) {
      return (
        <div className={property.class}>
          <InputDefinition
            init={this.props.init}
            dataSet={property.info}
            mode={this.props.mode}
          />
        </div>
      );
    }
    if (!property.isNone) {
      return getProductDefinitions(property.info.loopValues, property.title);
    } else {
      return <div>現在設定されていません。</div>;
    }
  }

  getCardJsx() {
    let objCreator = new globalSource.objectCreator();
    let prop = this.props.init;
    let photoURL = this.props.init.store.dataContainer.valueArray[
      this.props.init.store.current.value.valuesIndex
    ].photoUrl;
    if (this.props.mode === "store") {
      return objCreator.createCardJsx({
        topPartial: (
          <div className="property__toppartial">
            <Photo init={this.props.init} photoUrl={photoURL} />
            <div className="property__detail">
              {this.renderDefinition(
                objCreator.createDefProperty({
                  mode: this.props.mode,
                  current: null,
                })
              )}
            </div>
          </div>
        ),
        button: (
          <ButtonContainer
            buttonSetting={objCreator.createButtonSetting(
              {
                infoIsNone: prop.store.current.isNull,
                canEdit: prop.store.canEdit,
              },
              {
                insertMethod: prop.updateStoreInfo,
                updateMethod: prop.enableToEditStore,
                deleteMethod: null,
                saveBtnIsVisible: prop.store.canEdit,
              }
            )}
          />
        ),
      });
    }

    if (this.props.mode === "product") {
      let outerArgs = objCreator.createDefProperty({
        mode: this.props.mode,
        current: this.props.thisDefine,
      });
      console.log(this.props.init);
      let photoURL = this.props.init.product.dataContainer.valueArray[
        outerArgs.current.valuesIndex
      ].photoUrl;
      return {
        topPartial: (
          <div className="property__toppartial">
            <Photo init={this.props.init} photoUrl={photoURL} />
            <div className="property__detail">
              {this.renderDefinition(objCreator.createDefProperty(outerArgs))}
            </div>
          </div>
        ),
        button: (
          <ButtonContainer
            init={this.props.init}
            buttonSetting={objCreator.createButtonSetting(
              {
                infoIsNone: prop.store.current.isNull,
                canEdit: prop.store.canEdit,
              },
              {
                insertMethod: prop.updateProductInfo,
                updateMethod: () =>
                  prop.enableToEditProduct(this.props.thisDefine.valuesIndex),
                deleteMethod: prop.deleteProductInfo,
                saveBtnIsVisible:
                  prop.product.canEdit &&
                  outerArgs.current.valuesIndex === prop.product.current.index,
              }
            )}
          />
        ),
      };
    }
  }

  render() {
    let cardJsx = this.getCardJsx();
    return (
      <div className="property__card--setting">
        {cardJsx.topPartial}
        <div className="property__bottompartial--onlyButton">
          {cardJsx.button}
        </div>
      </div>
    );
  }
}
