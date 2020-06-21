//<![CDATA[

// DragResizeの使用は簡単です！
//最初に新しいDragResize（）オブジェクトを宣言し、独自の名前とオブジェクトを渡します
//オプションのパラメータ/設定を構成するキー：

var dragresize = new DragResize("dragresize", {
  minWidth: 10,
  minHeight: 10,
  minLeft: 0,
  minTop: 0,
  maxLeft: 600,
  maxTop: 300,
});

dragresize.isElement = function (elm) {
  if (elm.className && elm.className.indexOf("drsElement") > -1) return true;
};
dragresize.isHandle = function (elm) {
  if (elm.className && elm.className.indexOf("drsMoveHandle") > -1) return true;
};

dragresize.ondragfocus = function () {};
dragresize.ondragstart = function (isResize) {};
dragresize.ondragmove = function (isResize) {};
dragresize.ondragend = function (isResize) {};
dragresize.ondragblur = function () {};

dragresize.apply(document);
