import * as entityCreator from "./EntityClass";
export class dummy {
  constructor() {
    this.product = new entityCreator.product();
    this.store = new entityCreator.store();
  }

  getDummySearchStoreByCustomer() {
    let data = [
      ["AA店", "ラーメン太郎の麺", "2階", "220", "19", ""],
      ["BB店", "ラーメン太郎の麺", "1階", "230", "5", ""],
      ["CC店", "ラーメン次郎の麺", "5階", "240", "3", ""],
    ];

    return this.objectCreator.createSearchStoreByCustomerContainer({
      searchWord: "麺",
      list: data.map((index) => {
        return this.objectCreator.createSearchStoreByCustomerItem(
          {
            storeName: index[0],
            productName: index[1],
            placeName: index[2],
            value: index[3],
            count: index[4],
            photoUrl: index[5],
          },
          { photoUrl: true }
        );
      }),
    });
  }

  getDummyStoreContainer(isValues) {
    let data = isValues
      ? [
          [
            "AA店",
            "何某都　何某区　春風1-10-2",
            "000-0000-0000",
            "https://asdf/asdf",
            "10:00~20:00 土曜休業",
            "",
          ],
          [
            "BB店",
            "何某県　何某市　富士見1-10-2",
            "11-1111-11111",
            "https://ddd/dasf",
            "10:00~20:00 土曜休業",
            "",
          ],
          [
            "CC店",
            "何某府　何某町　十日町1-10-2",
            "22-2222-2222",
            "https://ffff/wwwww",
            "10:00~20:00 土曜休業",
            "",
          ],
        ]
      : ["", "", "", "", ""];

    return this.store.getDataContainer(data);
  }

  getDummyProductContainer(dd) {
    return this.product.getDataContainer(dd);
  }
}
