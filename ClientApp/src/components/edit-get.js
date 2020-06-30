function getinstance() {
  return [
    {
      store: "store",
      value: {
        outerArgs: null,
        prop: null,
        photoURL: this.props.init.store.dataContainer.valueArray[
          this.props.init.store.current.value.valuesIndex
        ].photoUrl,
        saveBtn: prop.store.flag.canEdit,
        insertMethod: prop.updateStoreInfo,
        detail: (
          <div className="property__detail">
            {this.renderDefinition(
              objCreator.createDefProperty({
                mode: this.props.mode,
                current: null,
              })
            )}{" "}
          </div>
        ),
      },
    },
    {
      store: "insert_product",
      value: {
        outerArgs: objCreator.createDefProperty({
          mode: this.props.mode,
          current: this.props.init.product.current,
        }),
        prop: null,
        photoURL: null,
        saveBtn: prop.product.flag.canInsert,
        insertMethod: prop.createProductInfo,
        detail: this.renderDefinition(objCreator.createDefProperty(outerArgs)),
      },
    },
    {
      store: "product",
      value: {
        outerArgs: objCreator.createDefProperty({
          mode: this.props.mode,
          current: this.props.thisDefine,
        }),
        prop: null,
        photoURL: this.props.init.product.dataContainer.valueArray[
          outerArgs.current.valuesIndex
        ].photoUrl,
        saveBtn: prop.product.flag.canEdit &&
          outerArgs.current.valuesIndex === prop.product.current.valuesIndex,
        insertMethod : prop.updateProductInfo,
        detail: this.renderDefinition(objCreator.createDefProperty(outerArgs)),
      },
    },
  ];
}

function getCardJsx() {
  let objCreator = new globalSource.objectCreator();
  let jsx = getinstance().find((index) => index.store === this.props.mode)
    .value;


  if (this.props.mode === "insert_product") {
  }

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
            updateMethod: () =>
              prop.enableToEditProduct(this.props.thisDefine.valuesIndex),
            deleteMethod: prop.deleteProductInfo,
            saveBtnIsVisible: jsx.saveBtn,
          }
        )}
      />
    ),
  };
}
