class Slider {
  constructor() {
    this.slideWidth = $(".intro__slider-container").outerWidth(); // .slideの幅を取得して代入
    this.slideNum = $(".intro__slide").length; // .slideの数を取得して代入

    this.slideSetWidth = this.slideWidth * this.slideNum; // .slideの幅×数で求めた値を代入
    $(".intro__slideSet").css("width", this.slideSetWidth); // .slideSetのスタイルシートにwidth: slideSetWidthを指定

    this.slideCurrent = 0; // 現在地を示す変数
    this.correctionLeft = +2;
  }

  moveNext() {
    this.slideCurrent++;
    this.moveImage();
  }

  moveProve() {
    this.slideCurrent--;
    this.moveImage();
  }

  moveImage() {
    // slideCurrentが0以下だったら
    if (this.slideCurrent < 0) {
      this.slideCurrent = this.slideNum - 1;

      // slideCurrentがslideNumを超えたら
    } else if (this.slideCurrent > this.slideNum - 1) {
      // slideCUrrent >= slideNumでも可
      this.slideCurrent = 0;
    }
    var moveLength =
      this.slideCurrent * this.slideWidth -
      this.correctionLeft * this.slideCurrent;
    $(".intro__slideSet").animate({
      left: -moveLength,
    });
  }
}

class TouchSlide {
  constructor(slider) {
    this.slider = slider;
    this.direction;
    this.position;
  }
  //スワイプ開始時の横方向の座標を格納
  onTouchStart(event) {
    this.position = this.getPosition(event);
    this.direction = ""; //一度リセットする
  }

  //スワイプの方向（left／right）を取得
  onTouchMove(event) {
    if (this.position - this.getPosition(event) > 70) {
      // 70px以上移動しなければスワイプと判断しない
      this.direction = "left"; //左と検知
    } else if (this.position - this.getPosition(event) < -70) {
      // 70px以上移動しなければスワイプと判断しない
      this.direction = "right"; //右と検知
    }
  }

  onTouchEnd(event) {
    if (this.direction == "right") {
      slider.moveProve();
    }
    if (this.direction == "left") {
      slider.moveNext();
    }
  }

  //横方向の座標を取得
  getPosition(event) {
    return event.originalEvent.touches[0].pageX;
  }
}

// アニメーションを実行する独自関数
var slider = new Slider();
var touchSlide = new TouchSlide(slider);
// 次へボタンが押されたとき
$(".intro__slide-button--right").click(function () {
  slider.moveNext();
});

$(".intro__slide-button--left").click(function () {
  slider.moveProve();
});

// タッチイベント
// $(function () {
//   $("#touch").on("touchstart", touchSlide.onTouchStart(e)); //指が触れたか検知
//   $("#touch").on("touchmove", touchSlide.onTouchMove(e)); //指が動いたか検知
//   $("#touch").on("touchend", touchSlide.onTouchEnd(e)); //指が離れたか検知
// });
