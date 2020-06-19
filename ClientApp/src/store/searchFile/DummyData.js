import { objectCreator } from "./SearchCommon";

export class dummy {
  constructor() {
    this.objectCreator = new objectCreator();
  }

  getDummySearchResult() {
    let resultList = {
      searchWord: "麺",
      list: null,
    };

    let list = [];
    let data = [
      ["AA店", "ラーメン太郎の麺", "2階", "220", "19"],
      ["BB店", "ラーメン太郎の麺", "1階", "230", "5"],
      ["CC店", "ラーメン次郎の麺", "5階", "240", "3"],
    ];

    data.forEach((index) => {
      list.push(
        this.objectCreator.createSearchResult({
          storeName: index[0],
          productName: index[1],
          placeName: index[2],
          value: index[3],
          count: index[4],
        })
      );
    });

    resultList.list = list;
    return resultList;
  }

  getDummyStoreInfo(isValues) {
    let dataSet = this.objectCreator.createDataSetObject();

    const shopInfoArray = [];
    let data = [];
    if (isValues) {
      data = [
        [
          "AA店",
          "何某都　何某区　春風1-10-2",
          "000-0000-0000",
          "https://asdf/asdf",
          "10:00~20:00 土曜休業",
        ],
        [
          "BB店",
          "何某県　何某市　富士見1-10-2",
          "11-1111-11111",
          "https://ddd/dasf",
          "10:00~20:00 土曜休業",
        ],
        [
          "CC店",
          "何某府　何某町　十日町1-10-2",
          "22-2222-2222",
          "https://ffff/wwwww",
          "10:00~20:00 土曜休業",
        ],
      ];
    } else {
      data = ["", "", "", "", ""];
    }

    data.forEach((index) => {
      shopInfoArray.push(
        this.objectCreator.createShopInfo({
          storeName: index[0],
          address: index[1],
          telephone: index[2],
          url: index[3],
          time: index[4],
        })
      );
    });

    dataSet = {
      valueNames: {
        storeName: "店舗名",
        address: "住所",
        telephone: "電話番号",
        url: "URL",
        time: "営業時間",
      },
      values: shopInfoArray,
    };

    return dataSet;
  }

  getDummyProductInfo() {
    let dataSet = this.objectCreator.createDataSetObject();
    const data = [
      [
        "ラーメン太郎の麺",
        "220",
        "19",
        "麺類",
        "小麦粉（国産）、食塩、油",
        "株式会社　ドコドコ食品",
        "何某製麺部式会社",
      ],
      [
        "ラーメン太郎の麺",
        "230",
        "5",
        "麺類",
        "小麦粉（国産）、食塩、油",
        "株式会社　ドコドコ食品",
        "何某製麺部式会社",
      ],
      [
        "ラーメン次郎の麺",
        "240",
        "3",
        "麺類",
        "小麦粉（国産）、食塩、ショートニング",
        "何某製麺部式会社",
        "何某製麺部式会社　岐阜工場",
      ],
    ];

    const shopInfoArray = [];
    data.forEach((index) => {
      shopInfoArray.push(
        this.objectCreator.createProductInfo({
          productName: index[0],
          value: index[1],
          count: index[2],
          commonName: index[3],
          expirationDate: index[4],
          seller: index[5],
          factory: index[6],
        })
      );
    });

    dataSet = {
      valueNames: {
        productName: "製品名",
        value: "値段",
        count: "個数",
        commonName: "名称",
        expirationDate: "原材料名",
        seller: "製造者",
        factory: "製造者",
      },
      values: shopInfoArray,
    };
    return dataSet;
  }
}
