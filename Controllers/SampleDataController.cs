using System.Collections.Generic;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using reared.net.Model;
using reared.net.Model.Entity;

namespace reared.net.Controllers {

    // public class StoreController : ControllerBase {
    //     [Route ("[controller]")]
    //     public Store[] Get () {
    //         return new DummyDataCreator ().GetStores ();
    //     }

    // }
    [Route ("[controller]")]
    public class ProductController : ControllerBase {
        public List<string[]> get () {
            return (new DummyDataCreator ().GetProduct ());
        }

    }

}