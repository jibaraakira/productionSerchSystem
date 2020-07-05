using System;
namespace reared.net.Model.Entity {
    public class Result {
        public string storeName { get; set; }
        public string productName { get; set; }
        public string placeName { get; set; }
        public string value { get; set; }
        public string count { get; set; }
        public string photoUrl { get; set; }
    }

    public class Store {
        public string storeName { get; set; }
        public string address { get; set; }
        public string telephone { get; set; }
        public string url { get; set; }
        public string time { get; set; }
        public string photoUrl { get; set; }
    }
    public class Product {
        public string productName { get; set; }
        public string value { get; set; }
        public string count { get; set; }
        public string commonName { get; set; }
        public string expirationDate { get; set; }
        public string seller { get; set; }
        public string factory { get; set; }
        public string photoUrl { get; set; }
    }
}