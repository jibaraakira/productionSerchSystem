import React from "react";
import * as common from "../../store/searchFile/SearchCommon";

export function selectJsx(jsxArray, keyName, selector) {
  let result = jsxArray.find((index) => {
    return index[keyName] === selector;
  });
  return result;
}

export function createDefinitions(storeInfo) {
  let definitions = [];
  storeInfo.forEach((ele) => {
    definitions.push(
      <dl>
        <dt>{ele.logicName}</dt>
        <dd>{ele.value}</dd>
      </dl>
    );
  });
  return definitions;
}

export function getStoreDefinition(storeInfo) {
  if (storeInfo == null) return null;

  let definitions = createDefinitions(storeInfo);

  return <div className="proinfo__data--type1">{definitions}</div>;
}

export function getProductDefinitions(product, title) {
  if (product == null) return null;

  let definitions = createDefinitions(product);

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

export class Card extends React.Component {
  renderDefinition(outArgs) {
    const renderProperty = function (props) {
      if (outArgs.mode === "store") {
        return {
          info: props.init.store.current,
          canEdit: props.init.store.canEdit,
          isNone: props.init.store.currentInfoIsNull,
          title: "",
          class: "proinfo__data--type2",
        };
      }

      if (outArgs.mode === "product") {
        let currentIndex = props.init.product.currentIndex;
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
          isNone: props.init.product.currentInfoIsNull,
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
    if (this.props.init.current == null) {
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

  getButtons(
    { infoIsNone, canEdit },
    { insertMethod, updateMethod, deleteMethod, saveBtnIsVisible }
  ) {
    return (
      <div className="property__buttons">
        {this.renderInsertBtn({ infoIsNone, canEdit })}
        {this.renderBtns({
          insertMethod,
          updateMethod,
          deleteMethod,
          saveBtnIsVisible,
        })}
      </div>
    );
  }

  render() {
    let cardSetting = { topPartial: null, button: null };
    let objCreator = new common.objectCreator();

    if (this.props.mode === "store") {
      let prop = this.props.init;
      let outerArgs = objCreator.createDefProperty({
        mode: this.props.mode,
        current: null,
      });
      cardSetting = {
        topPartial: (
          <div className="property__toppartial">
            <div className="property__img"></div>
            <div className="property__detail">
              {this.renderDefinition(outerArgs)}
            </div>
          </div>
        ),
        button: this.getButtons(
          {
            infoIsNone: prop.store.currentInfoIsNull,
            canEdit: prop.store.canEdit,
          },
          {
            insertMethod: prop.updateStoreInfo,
            updateMethod: prop.enableToEditStore,
            deleteMethod: null,
            saveBtnIsVisible: prop.store.canEdit,
          }
        ),
      };
    }

    if (this.props.mode === "product") {
      let prop = this.props.init;
      let outerArgs = objCreator.createDefProperty({
        mode: this.props.mode,
        current: this.props.current,
      });

      cardSetting = {
        topPartial: (
          <div className="property__toppartial">
            <div className="property__img"></div>
            <div className="property__detail">
              {this.renderDefinition(outerArgs)}
            </div>
          </div>
        ),
        button: this.getButtons(
          {
            infoIsNone: prop.store.currentInfoIsNull,
            canEdit: prop.store.canEdit,
          },
          {
            insertMethod: prop.updateProductInfo,
            updateMethod: () =>
              prop.enableToEditProduct(this.props.current.valuesIndex),
            deleteMethod: prop.deleteProductInfo,
            saveBtnIsVisible:
              prop.product.canEdit &&
              outerArgs.current.valuesIndex === prop.product.currentIndex,
          }
        ),
      };
    }

    return (
      <div className="property__card--setting">
        {cardSetting.topPartial}
        <div className="property__bottompartial--onlyButton">
          {cardSetting.button}
        </div>
      </div>
    );
  }
}
