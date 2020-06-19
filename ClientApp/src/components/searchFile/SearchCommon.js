import React from "react";

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
  console.log(storeInfo);
  if (storeInfo == null) return null;

  let definitions = createDefinitions(storeInfo);

  return <div className="proinfo__data--type1">{definitions}</div>;
}

export function getProductDefinitions(product) {
  console.log(product);
  if (product == null) return null;

  let definitions = createDefinitions(product);

  return (
    <div className="proinfo__detail">
      <h3>商品詳細</h3>
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
    console.log("insert");
    console.log(dataSet);
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
  renderDefinition() {
    const current = this.props.init.currentStoreInfo;
    const storeInfoIsNone = this.props.init.storeInfoIsNone;

    if (this.props.init.canEditStoreSearch) {
      return (
        <div className="proinfo__data--type2">
          <InputDefinition init={this.props.init} dataSet={current} />
        </div>
      );
    }

    if (!storeInfoIsNone) {
      return getProductDefinitions(current.loopValues);
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

    if (this.props.init.canEditStoreSearch) {
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

    if (this.props.mode === "store") {
      let prop = this.props.init;
      cardSetting = {
        topPartial: (
          <div className="property__toppartial">
            <div className="property__img"></div>
            <div className="property__detail">{this.renderDefinition()}</div>
          </div>
        ),
        button: this.getButtons(
          {
            infoIsNone: prop.canEditStoreSearch,
            canEdit: prop.storeInfoIsNone,
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
      cardSetting = {
        topPartial: (
          <div className="property__toppartial">
            <div className="property__img"></div>
            {getProductDefinitions(this.props.current.loopValues)}
          </div>
        ),
        button: this.getButtons(
          {
            infoIsNone: prop.canEditProduct,
            canEdit: prop.productInfoIsNone,
          },
          {
            insertMethod: prop.createProductInfo,
            updateMethod: prop.updateProductInfo,
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
