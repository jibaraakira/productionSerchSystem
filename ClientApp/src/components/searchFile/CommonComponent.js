import React from "react";
import * as globalSource from "../../store/searchFile/GlobalSource";
import { CSSTransition } from "react-transition-group";

export function selectJsx(jsxArray, keyName, selector) {
  let result = jsxArray.find((index) => {
    return index[keyName] === selector;
  });
  return result;
}

export function createDefinitions(define) {
  return define.map((ele) => (
    <CSSTransition timeout={500} classNames="item">
      <dl>
        <dt>{ele.logicName}</dt>
        <dd>{ele.value}</dd>
      </dl>
    </CSSTransition>
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
  render() {
    let dataSet = this.props.dataSet;
    if (dataSet == null) return null;

    let data = dataSet.loopValues.map((ele) => (
      <dl>
        <dt>{ele.logicName}</dt>
        <dd>
          <input
            type="text"
            className="search__input input--type3"
            onChange={(event) =>
              this.props.cardSetter.getInsertMethod(
                event,
                ele.keyName,
                dataSet.valuesIndex
              )
            }
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
        return "写真を読み込む";
      } else {
        return "写真を変更する";
      }
    };
    return (
      <div className="property__img hovertile">
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
              <div className="hovertile__message--info">
                {" "}
                {photo(this.props.photoUrl)}
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export class Card extends React.Component {
  renderDefinition() {
    let property = vender(this.props.mode, this).getDefinition();
    if (property.canEdit) {
      return (
        <div className={property.class}>
          <InputDefinition
            init={this.props.init}
            dataSet={property.info}
            mode={this.props.mode}
            cardSetter={vender(this.props.mode, this)}
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
    let jsx = vender(this.props.mode, this).getInstance();

    console.log(this.props.init);

    return {
      topPartial: (
        <div className="property__toppartial">
          <Photo init={this.props.init} photoUrl={jsx.photoURL} />
          {jsx.detail}
        </div>
      ),
      button: (
        <ButtonContainer
          init={this.props.init}
          buttonSetting={objCreator.createButtonSetting(
            {
              infoIsNone: prop.store.current.isNull,
              canEdit: prop.store.flag.canEdit,
            },
            {
              insertMethod: jsx.insertMethod,
              updateMethod: jsx.updateMethod,
              deleteMethod: prop.deleteProductInfo,
              saveBtnIsVisible: jsx.saveBtn,
            }
          )}
        />
      ),
    };
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

function vender(mode, th) {
  switch (mode) {
    case "store":
      return new storeCardSetter(th);
    case "insert_product":
      return new insertProductCardSetter(th);
    case "product":
      return new productCardSetter(th);
    default:
      break;
  }
}

class cardSetter {
  constructor(th) {
    this.th = th;
    this.props = th.props.init;
    this.objCreator = new globalSource.objectCreator();
  }
  getInstance() {}
  getDefinition() {}
  getInsertMethod() {}
}

class storeCardSetter extends cardSetter {
  getInstance() {
    return {
      outerArgs: null,
      prop: null,
      photoURL: this.props.store.dataContainer.valueArray[
        this.props.store.current.value.valuesIndex
      ].photoUrl,
      saveBtn: this.props.store.flag.canEdit,
      insertMethod: this.props.updateStoreInfo,
      updateMethod: this.props.enableToEditStore,
      detail: (
        <div className="property__detail">
          {this.th.renderDefinition(
            this.objCreator.createDefProperty({
              mode: this.props.mode,
              current: this.props.store.current,
            })
          )}
        </div>
      ),
    };
  }
  getDefinition() {
    return {
      info: this.props.store.current.value,
      canEdit: this.props.store.flag.canEdit,
      isNone: this.props.store.current.isNull,
      title: "",
      class: "proinfo__data--type2",
    };
  }

  getInsertMethod(event, valueKeyName, valueIndex) {
    console.log(`store ${event.target.value}`);
    this.props.editStore(valueKeyName, event.target.value, valueIndex);
  }
}

class insertProductCardSetter extends cardSetter {
  getInstance() {
    let outerArgs = this.objCreator.createDefProperty({
      mode: this.props.mode,
      current: this.props.product.current,
    });
    return {
      outerArgs: outerArgs,
      prop: null,
      photoURL: null,
      saveBtn: this.props.product.flag.canInsert,
      insertMethod: this.props.createProductInfo,
      updateMethod: () =>
        this.props.enableToEditProduct(this.props.thisDefine.valuesIndex),
      detail: this.th.renderDefinition(outerArgs),
    };
  }

  getDefinition() {
    let currentIndex = this.props.product.current.valuesIndex;
    let canEdit = null;
    let outerArgs = this.objCreator.createDefProperty({
      mode: this.props.mode,
      current: this.props.product.current,
    });
    if (currentIndex == null) {
      canEdit = this.props.product.flag.canEdit;
    } else {
      canEdit =
        this.props.product.flag.canEdit &&
        outerArgs.current.valuesIndex === currentIndex;
    }
    return {
      info: outerArgs.current,
      canEdit: canEdit,
      isNone: this.props.product.current.isNull,
      title: "商品詳細",
      class: "proinfo__data--type2",
    };
  }

  getInsertMethod(event, valueKeyName, valueIndex) {
    console.log(`edit ${event.target.value}`);
    this.props.editProduct(valueKeyName, event.target.value, valueIndex);
  }
}

class productCardSetter extends cardSetter {
  getInstance() {
    let dd = this.objCreator.createDefProperty({
      mode: this.props.mode,
      current: this.th.props.thisDefine,
    });
    return {
      outerArgs: dd,
      prop: null,
      photoURL: this.props.product.dataContainer.valueArray[
        this.th.props.thisDefine.valuesIndex
      ].photoUrl,
      saveBtn: this.props.product.flag.canEdit, //&&  dd.current.valuesIndex === prop.product.current.valuesIndex
      insertMethod: this.props.updateProductInfo,
      updateMethod: () =>
        this.props.enableToEditProduct(dd.current.valuesIndex),
      detail: this.th.renderDefinition(dd),
    };
  }

  getDefinition() {
    let currentIndex = this.props.product.current.valuesIndex;
    let canEdit = null;
    let outerArgs = this.objCreator.createDefProperty({
      mode: this.props.mode,
      current: this.th.props.thisDefine,
    });
    if (currentIndex == null) {
      canEdit = this.props.product.flag.canEdit;
    } else {
      canEdit =
        this.props.product.flag.canEdit &&
        outerArgs.current.valuesIndex === currentIndex;
    }
    return {
      info: outerArgs.current,
      canEdit: canEdit,
      isNone: this.props.product.current.isNull,
      title: "商品詳細",
      class: "proinfo__data--type2",
    };
  }

  getInsertMethod(event, valueKeyName, valueIndex) {
    console.log(`edit ${event.target.value}`);
    this.props.editProduct(valueKeyName, event.target.value, valueIndex);
  }
}
