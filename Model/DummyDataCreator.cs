using System.Collections.Generic;
using System.Linq;
using reared.net.Model.Entity;

namespace reared.net.Model {
    public class DummyDataCreator {
        public Store[] GetStores () {
            List<string[]> lists =
                new List<string[]> {
                    new string[] {
                    "AA店",
                    "何某都　何某区　春風1-10-2",
                    "000-0000-0000",
                    "https://asdf/asdf",
                    "10:00~20:00 土曜休業",
                    ""
                    },
                    new string[] {
                    "BB店",
                    "何某県　何某市　富士見1-10-2",
                    "11-1111-11111",
                    "https://ddd/dasf",
                    "10:00~20:00 土曜休業",
                    "",
                    },
                    new string[] {
                    "CC店",
                    "何某府　何某町　十日町1-10-2",
                    "22-2222-2222",
                    "https://ffff/wwwww",
                    "10:00~20:00 土曜休業",
                    "",
                    },

                };

            Store[] storeArray =
                lists.Select (index => new Store () {
                    storeName = index[0],
                        address = index[1],
                        telephone = index[2],
                        url = index[3],
                        time = index[4],
                        photoUrl = index[5],
                }).ToArray ();

            return storeArray;
        }

        public List<string[]> GetProduct () {
            var ddd = new List<string[]> () {
                new string[] {
                "ラーメン太郎の麺",
                "220",
                "19",
                "麺類",
                "小麦粉（国産）、食塩、油",
                "株式会社　ドコドコ食品",
                "何某製麺部式会社",
                "kkk"
                },
                new string[] {
                "ラーメン太郎の麺",
                "230",
                "5",
                "麺類",
                "小麦粉（国産）、食塩、油",
                "株式会社　ドコドコ食品",
                "何某製麺部式会社",
                ""
                },
                new string[] {
                "ラーメン次郎の麺",
                "240",
                "3",
                "麺類",
                "小麦粉（国産）、食塩、ショートニング",
                "何某製麺部式会社",
                "何某製麺部式会社　岐阜工場",
                ""
                }
            };
            return ddd;
        }
    }
}