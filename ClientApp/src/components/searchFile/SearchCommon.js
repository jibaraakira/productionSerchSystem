import React from "react";
import * as common from "../../store/searchFile/SearchCommon";
export function createDefinitions(storeInfo) {
  let definitions = [];
  storeInfo.forEach((ele) => {
    definitions.push(
      <dl>
        <dt>{ele.valueNames}</dt>
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
  handleChange(event, valueKeyName, valueIndex) {
    this.props.init.insertValue(valueKeyName, event.target.value, valueIndex);
  }

  render() {
    let dataSet = this.props.dataSet;
    if (dataSet == null) return null;
    const definitions = [];
    dataSet.loopValues.forEach((ele) => {
      definitions.push(
        <dl>
          <dt>{ele.valueNames}</dt>
          <dd>
            <input
              type="text"
              className="search__input input--type3"
              onChange={(event) =>
                this.handleChange(event, ele.keyName, dataSet.valuesIndex)
              }
              defaultValue={ele.value}
            />
          </dd>
        </dl>
      );
    });
    return <div className="proinfo__data--type2">{definitions}</div>;
  }
}

export class Card extends React.Component {

  renderDefinition(outArgs) {

    const renderProperty = function (props) {
      if (outArgs.mode === 'store') {
        return {
          info: props.init.nshop.current,
          canEdit: props.init.nshop.canEdit,
          isNone: props.init.nshop.currentInfoIsNull,
          title: "",
          class: "proinfo__data--type2"
        };
      }

      if (outArgs.mode === 'product') {
        let currentIndex = props.init.product.currentIndex;
        let canEdit = null;
        if (currentIndex == null) {
          canEdit = props.init.product.canEdit;
        } else {
          canEdit = props.init.product.canEdit &&
            outArgs.current.valuesIndex === currentIndex;
        }
        return {
          info: outArgs.current,
          canEdit: canEdit,
          isNone: props.init.product.currentInfoIsNull,
          title: "商品詳細",
          class: "proinfo__data--type1"
        };
      }
    }

    console.log(outArgs.current);
    let property = renderProperty(this.props);
    if (property.canEdit) {
      return (
        <div className={property.class}>
          <InputDefinition init={this.props.init} dataSet={property.info} />
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
          onClick={this.props.init.editStoreInfo}
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

  renderBtns({ insertMethod, updateMethod, deleteMethod } = {}) {
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

    if (this.props.init.nshop.canEdit) {
      return saveButton;
    } else {
      return updateButton;
    }
  }

  getButtons(
    { infoIsNone, canEdit },
    { insertMethod, updateMethod, deleteMethod }
  ) {
    return (
      <div className="property__buttons">
        {this.renderInsertBtn({ infoIsNone, canEdit })}
        {this.renderBtns({
          insertMethod,
          updateMethod,
          deleteMethod,
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
            <div className="property__detail">{this.renderDefinition(outerArgs)}</div>
          </div>
        ),
        button: this.getButtons(
          {
            infoIsNone: prop.nshop.currentInfoIsNull,
            canEdit: prop.nshop.canEdit,
          },
          {
            insertMethod: prop.endToEditStoreInfo,
            updateMethod: prop.editStoreInfo,
            deleteMethod: null,
          }
        ),
      };
    }

    if (this.props.mode === "product") {
      let prop = this.props.init;
      var outerArgs = objCreator.createDefProperty({
        mode: this.props.mode,
        current: this.props.current,
      });
      cardSetting = {
        topPartial: (
          <div className="property__toppartial">
            <div className="property__img"></div>
            {this.renderDefinition(outerArgs)}
          </div>
        ),
        button: this.getButtons(
          {
            infoIsNone: prop.nshop.currentInfoIsNull,
            canEdit: prop.nshop.canEdit,
          },
          {
            insertMethod: prop.createProductInfo,
            updateMethod: () => prop.updateProductInfo(this.props.current.valuesIndex),
            deleteMethod: prop.deleteProductInfo,
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
