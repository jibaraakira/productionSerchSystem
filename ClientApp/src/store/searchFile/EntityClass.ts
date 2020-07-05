import { objectCreator } from "./GlobalSource";

export class entity {
	public objectCreator: any;
	public createLogicNames: any;

  constructor() {
    this.objectCreator = new objectCreator();
  }

  getLogicName() {}

  createDataContainer(valueArraySource, userBranch, userBranchSetting) {
    return this.objectCreator.createDataContainerObject({
      logicNames: this.createLogicNames(this.getLogicName(), userBranch),
      valueArray: valueArraySource.map((index) => {
        return this.createEntity(index, userBranchSetting);
      }),
    });
  }

  createEntity(index, ddd) {}
}

export class store extends entity {
	public userBranch: any;
	public userBranchSetting: any;

  constructor() {
    super();
    this.userBranch = {
      photoUrl: false,
    };
    this.userBranchSetting = {
      photoUrl: true,
    };
  }

  getLogicName() {
    return {
      storeName: "店舗名",
      address: "住所",
      telephone: "電話番号",
      url: "URL",
      time: "営業時間",
    };
  }

  getDataContainer(valueArraySource) {
    return this.createDataContainer(
      valueArraySource,
      this.userBranch,
      this.userBranchSetting
    );
  }

  createLogicNames(names, userBranch) {
    return this.objectCreator.createShopEntity(names, userBranch);
  }

  createEntity(index, ddd) {
    return this.objectCreator.createShopEntity(
      {
        storeName: index[0],
        address: index[1],
        telephone: index[2],
        url: index[3],
        time: index[4],
        photoUrl: index[5],
      },
      ddd
    );
  }
}

export class product extends entity {
	public userBranch: any;
	public userBranchSetting: any;

  constructor() {
    super();
    this.userBranch = {
      photoUrl: false,
    };
    this.userBranchSetting = {
      photoUrl: true,
    };
  }

  getLogicName() {
    return {
      productName: "製品名",
      value: "値段",
      count: "個数",
      commonName: "名称",
      expirationDate: "原材料名",
      seller: "製造者",
      factory: "製造者",
    };
  }

  createLogicNames(names, userBranch) {
    return this.objectCreator.createProductEntity(names, userBranch);
  }

  getDataContainer(valueArraySource) {
    return this.createDataContainer(
      valueArraySource,
      this.userBranch,
      this.userBranchSetting
    );
  }

  createEntity(index, ddd) {
    return this.objectCreator.createProductEntity(
      {
        productName: index[0],
        value: index[1],
        count: index[2],
        commonName: index[3],
        expirationDate: index[4],
        seller: index[5],
        factory: index[6],
        photoUrl: index[7],
      },
      ddd
    );
  }
}
