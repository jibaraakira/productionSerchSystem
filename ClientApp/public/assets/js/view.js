class imageBoard {}

// class move {
//   constructor() {
//     this.elements = document.getElementsByClassName("drag-and-drop");

//     //要素内のクリックされた位置を取得するグローバル（のような）変数
//     this.x = 0;
//     this.y = 0;

//     //マウスが要素内で押されたとき、又はタッチされたとき発火
//     for (var i = 0; i < this.elements.length; i++) {
//       this.elements[i].addEventListener("mousedown", mouseDown, false);
//       this.elements[i].addEventListener("touchstart", mouseDown, false);
//       this.elements[i].addEventListener("dblclick", clickElement, false);
//     }
//   }

//   clickElement(e) {
//     this.style.backgroundColor = "#ddd";
//     this.textContent = "dfd";
//   }

//   //マウスが押された際の関数
//   mouseDown(e) {
//     //クラス名に .drag を追加
//     this.classList.add("drag");

//     //タッチデイベントとマウスのイベントの差異を吸収
//     if (e.type === "mousedown") {
//       var event = e;
//     } else {
//       var event = e.changedTouches[0];
//     }

//     //要素内の相対座標を取得
//     this.x = event.pageX - this.offsetLeft;
//     this.y = event.pageY - this.offsetTop;

//     //ムーブイベントにコールバック
//     document.body.addEventListener("mousemove", this.moveElement, false);
//     document.body.addEventListener("touchmove", this.moveElement, false);
//   }

//   //マウスカーソルが動いたときに発火
//   moveElement(e) {
//     //ドラッグしている要素を取得
//     var drag = document.getElementsByClassName("drag")[0];

//     //同様にマウスとタッチの差異を吸収
//     if (e.type === "mousemove") {
//       var event = e;
//     } else {
//       var event = e.changedTouches[0];
//     }

//     //フリックしたときに画面を動かさないようにデフォルト動作を抑制
//     e.preventDefault();

//     //マウスが動いた場所に要素を動かす
//     drag.style.top = event.pageY - this.y + "px";
//     drag.style.left = event.pageX - this.x + "px";

//     //マウスボタンが離されたとき、またはカーソルが外れたとき発火
//     drag.addEventListener("mouseup", mouseUp, false);
//     document.body.addEventListener("mouseleave", mouseUp, false);
//     drag.addEventListener("touchend", mouseUp, false);
//     document.body.addEventListener("touchleave", mouseUp, false);
//   }

//   //マウスボタンが上がったら発火
//   mouseUp(e) {
//     var drag = document.getElementsByClassName("drag")[0];

//     //ムーブベントハンドラの消去
//     document.body.removeEventListener("mousemove", this.moveElement, false);
//     // drag.removeEventListener("mouseup", mouseUp, false);
//     document.body.removeEventListener("touchmove", this.moveElement, false);
//     drag.removeEventListener("touchend", mouseUp, false);

//     //クラス名 .drag も消す
//     drag.classList.remove("drag");
//   }
// }
//const moves = new move();

(function () {
  //要素の取得
  var elements = document.getElementsByClassName("drag-and-drop");

  //要素内のクリックされた位置を取得するグローバル（のような）変数
  var x;
  var y;

  //マウスが要素内で押されたとき、又はタッチされたとき発火
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", mouseDown, false);
    elements[i].addEventListener("touchstart", mouseDown, false);
    elements[i].addEventListener("dblclick", click, false);
  }
  //
  function click(e) {
    var isVisible = this.firstElementChild.style.display;
    if (isVisible == "") {
      this.style.backgroundColor = "#ddd";
      this.firstElementChild.style.display = "block";
      this.firstElementChild.textContent = this.textContent;
    } else {
      this.style.backgroundColor = "";
      this.firstElementChild.style.display = "none";
      this.textContent = this.firstElementChild.textContent;
    }

    document.body.removeEventListener("dblclick", click, false);
  }

  //マウスが押された際の関数
  function mouseDown(e) {
    //クラス名に .drag を追加
    this.classList.add("drag");

    //タッチデイベントとマウスのイベントの差異を吸収
    if (e.type === "mousedown") {
      var event = e;
    } else {
      var event = e.changedTouches[0];
    }

    //要素内の相対座標を取得
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;

    //ムーブイベントにコールバック
    document.body.addEventListener("mousemove", moveElement, false);
    document.body.addEventListener("touchmove", moveElement, false);
  }

  //マウスカーソルが動いたときに発火
  function moveElement(e) {
    //ドラッグしている要素を取得
    var drag = document.getElementsByClassName("drag")[0];

    //同様にマウスとタッチの差異を吸収
    if (e.type === "mousemove") {
      var event = e;
    } else {
      var event = e.changedTouches[0];
    }

    //フリックしたときに画面を動かさないようにデフォルト動作を抑制
    e.preventDefault();

    //マウスが動いた場所に要素を動かす
    drag.style.top = event.pageY - y + "px";
    drag.style.left = event.pageX - x + "px";

    //マウスボタンが離されたとき、またはカーソルが外れたとき発火
    drag.addEventListener("mouseup", mouseUp, false);
    document.body.addEventListener("mouseleave", mouseUp, false);
    drag.addEventListener("touchend", mouseUp, false);
    document.body.addEventListener("touchleave", mouseUp, false);
  }

  //マウスボタンが上がったら発火
  function mouseUp(e) {
    var drag = document.getElementsByClassName("drag")[0];

    //ムーブベントハンドラの消去
    document.body.removeEventListener("mousemove", moveElement, false);
    // drag.removeEventListener("mouseup", mouseUp, false);
    document.body.removeEventListener("touchmove", moveElement, false);
    drag.removeEventListener("touchend", mouseUp, false);

    //クラス名 .drag も消す
    drag.classList.remove("drag");
  }
})();
