//ページ内移動時の動作を、スクロールアニメにする設定。
var setValue = {
  timeFast: 100,
  showButtonTop: 300,
  spWidth: 700,
};

//画面をスクロールしたとき、表示する。
$(document).ready(function () {
  $(".intro__sample-container").css("display", "none");
});
$(window)
  .scroll(function () {
    showReturnButton();
    rotateKamon();
  })
  .resize(function () {
    displayHeaderNav();
    displayHeaderReturnButton();
  });

// #で始まるアンカーをクリックした場合に処理
$('a[href^="#"]').click(function () {
  moveByScroll($(this));
  hideHeaderNavInSpWidth();

  function moveByScroll($this) {
    // スクロールの速度
    var speed = 200; // ミリ秒
    // アンカーの値取得
    var href = $this.attr("href");
    // 移動先を取得
    var target = $(href == "#" || href == "" ? "html" : href);
    // 移動先を数値で取得
    var position = target.offset().top - 100;
    // スムーススクロール
    $("body,html").animate({ scrollTop: position }, speed, "swing");
  }

  function hideHeaderNavInSpWidth() {
    if (window.innerWidth <= setValue.spWidth) {
      $(".header__nav").slideUp(setValue.timeFast);
    }
  }
});

//任意位置までスクロールしたとき、.header__return-buttonを表示する。
function showReturnButton() {
  if (window.innerWidth <= setValue.spWidth) return;
  sleep(20, function () {
    var $returnButton = $(".header__return-button");
    var isHidden = $returnButton.css("display") == "none";
    var currentTop = $(window).scrollTop();
    if (currentTop >= setValue.showButtonTop) {
      if (isHidden) $returnButton.show(setValue.timeFast);
    } else {
      $returnButton.hide(setValue.timeFast);
    }
  });
}

// ロゴ（家紋）をスクロールに併せて回転させる
function rotateKamon() {
  var angle = $(window).scrollTop() * 0.2;

  $(".header__logo ")
    .children("img")
    .css("transform", `rotate(${angle}deg)`)
    .css("transform-origin", `30px 30px`);
}

//setValue.spWidth以下の幅の時、ヘッダーを押すと、ヘッダーメニューがドロップダウンメニューになる。
$(".header__logo").click(function () {
  var $headerLogo = $(".header__nav");
  if ($(window).width() <= setValue.spWidth) {
    $headerLogo.css("display") == "none"
      ? $headerLogo.slideDown(setValue.timeFast)
      : $headerLogo.slideUp(setValue.timeFast);
  } else {
    $headerLogo.css("display", "flex");
    return;
  }
});

//setValue.spWidth以下の幅の時、.header__navが必ず隠れるようにする
function displayHeaderNav() {
  $(".header__nav").css(
    "display",
    window.innerWidth <= setValue.spWidth ? "none" : "flex"
  );
}

///setValue.spWidth以下の幅の時、.header__return-buttonが隠れるようにする。
function displayHeaderReturnButton() {
  var $button = $(".header__return-button");
  window.innerWidth <= setValue.spWidth
    ? $button.hide(setValue.timeFast)
    : $button.show(setValue.timeFast);
}

function sleep(waitSec, callbackFunc) {
  // 経過時間（m秒）
  var spanedSec = 0;

  // 1m秒間隔で無名関数を実行
  var id = setInterval(function () {
    spanedSec++;

    // 経過時間 >= 待機時間の場合、待機終了。
    if (spanedSec >= waitSec) {
      // タイマー停止
      clearInterval(id);

      // 完了時、コールバック関数を実行
      if (callbackFunc) callbackFunc();
    }
  }, 1);
}

//
$(".intro__btn-base").click(function () {
  var $mes = $(".intro__sample-container");
  var $expandedItem = $(".intro__text--displayName");
  var isHidden = $mes.css("display") === "none";
  var itemHeigh = `${$expandedItem.css("height")}`.replace("px", "");
  var addHeight = 200;

  if (isHidden) {
    $expandedItem.animate({ height: `${itemHeigh + addHeight}px` }, 100);
    $mes.show(200);
  } else {
    $mes.hide(100);
    $expandedItem.animate({ height: `${itemHeigh - addHeight}px` }, 100);
  }
  itemHeigh;
});
