"user strick";

var defa = [{
  xPoint: 33,
  yPoint: 33
}, {
  xPoint: 11,
  yPoint: 11
}];

class controleSetter {
  constructor(maxLeft, maxTop) {
    this.dragresize = new DragResize("dragresize", {
      minWidth: 10,
      minHeight: 10,
      minLeft: 0,
      minTop: 0,
      maxLeft: maxLeft,
      maxTop: maxTop
    });

    this.dragresize.isElement = function (elm) {
      if (elm.className && elm.className.indexOf("drsElement") > -1) return true;
    };
    this.dragresize.isHandle = function (elm) {
      if (elm.className && elm.className.indexOf("drsMoveHandle") > -1) return true;
    };

    this.dragresize.ondragfocus = function () {};
    this.dragresize.ondragstart = function (isResize) {};
    this.dragresize.ondragmove = function (isResize) {};
    this.dragresize.ondragend = function (isResize) {};
    this.dragresize.ondragblur = function () {};

    this.dragresize.apply(document);
  }

  update(maxLeft, maxTop) {
    this.dragresize["maxLeft"] = maxLeft;
    this.dragresize["maxTop"] = maxTop;
  }
}

class venderObject {
  gerButtonObject(name) {
    return {
      name: name,
      canSwitch: false,
      flag: false
    };
  }
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinFlags: {
        canInsertPin: false,
        canUpdatePin: false,
        canDeletePin: false
      }
    };
    this.props.updateState(this.state);
  }

  changeFlag(flag) {
    const newPinFlag = Object.assign({}, this.state.pinFlags);
    newPinFlag[`can${flag}Pin`] = !this.state.pinFlags[`can${flag}Pin`];
    this.setState({
      pinFlags: newPinFlag
    });
    this.props.updateState(this.state);
  }

  render() {
    return React.createElement(
      "div",
      { className: "buttons" },
      React.createElement(
        "button",
        {
          type: "button",
          "class": "btn btn-primary",
          onClick: this.changeFlag.bind(this, "Insert")
        },
        "\u8FFD\u52A0"
      ),
      React.createElement(
        "button",
        {
          type: "button",
          "class": "btn btn-primary",
          onClick: this.changeFlag.bind(this, "Update")
        },
        "\u66F4\u65B0"
      ),
      React.createElement(
        "button",
        {
          type: "button",
          "class": "btn btn-primary",
          onClick: this.changeFlag.bind(this, "Delete")
        },
        "\u524A\u9664"
      )
    );
  }
}

class Pins extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinCoordinates: this.props.init,
      counter: this.props.init.length
    };
    this.props.updateState(this.state);
  }

  changeColorAsSelected(event) {
    if (!this.state.pinFlags.canUpdatePin) return;
    let clickedElement = event.currentTarget;
    clickedElement.style.backgroundColor = "blue";
    this.state("Update");
  }

  insertPin() {
    return this.state.pinCoordinates.map((coordinate, index) => React.createElement("div", {
      "class": "pin",
      id: `pinId-${index + this.state.counter}`,
      style: {
        left: `${coordinate.xPoint}px`,
        top: `${coordinate.yPoint}px`
      },
      onClick: this.changeColorAsSelected.bind(this)
    }));
  }
  render() {
    return this.insertPin();
  }
}

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinCoordinates: null,
      rangePinCoordinates: null,
      counter: null,
      button: [],
      pinFlags: {},
      map: {
        element: null,
        width: null,
        height: null
      },
      stalkerPin: null,
      mouseCoordinateOnMap: {
        xPoint: 0,
        yPoint: 0
      }
    };
    this.venderObject = new venderObject();
    this.resizeClass = null, this.updateDimensions = this.updateDimensions.bind(this);
  }

  updateDimensions() {
    var element = document.getElementById("map");
    this.resizeClass.update(element.clientWidth, element.clientHeight);
  }

  read() {
    const map = this.state.map.element.getBoundingClientRect();
    return {
      xPoint: event.pageX - Math.round(map.x),
      yPoint: event.pageY - Math.round(map.y)
    };
  }

  addPin(event) {
    if (!this.state.pinFlags.canInsertPin) return;
    this.state.stalkerPin.style.visibility = "hidden";
    const newCoordinate = this.state.mouseCoordinateOnMap;
    this.setState({ counter: ++this.state.counter });
    const { pinCoordinates } = this.state;
    this.setState({ pinCoordinates: [...pinCoordinates, newCoordinate] });
    this.changeFlag("Insert");
  }

  createButton() {
    let bottons = [];
    ["Insert", "Upadte", "Delete"].foreach(function (value) {
      bottons.push(venderObject.gerButtonObject(value));
    });
    return bottons;
  }

  componentDidMount() {
    this.setState({
      map: {
        element: document.getElementById("map")
      },
      stalkerPin: document.getElementsByClassName("pin--stalker")[0],
      button: {}
    });

    var element = document.getElementById("map");
    this.resizeClass = new controleSetter(element.clientWidth, element.clientHeight);
    window.addEventListener("resize", this.updateDimensions);
  }

  hiddenMouseStalker() {
    this.state.stalkerPin.style.visibility = "hidden";
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  moveMouseMove(event) {
    this.renderMouseStalker(event);
  }

  renderMouseStalker(event) {
    if (!this.state.pinFlags.canInsertPin) return;

    let currentPoint = this.read();

    let stalkerPin = this.state.stalkerPin;
    if (this.isOver(currentPoint)) {
      stalkerPin.style.visibility = "visible";
      stalkerPin.style.transform = `translate(${currentPoint.xPoint - 10}px, ${currentPoint.yPoint - 10}px)`;

      this.setState({
        mouseCoordinateOnMap: {
          xPoint: currentPoint.xPoint - 10,
          yPoint: currentPoint.yPoint - 10
        }
      });
    } else {
      stalkerPin.style.visibility = "hidden";
    }
  }

  isOver(currentPoint) {
    let mapinfo = this.state.map.element;
    let maps = {
      left: Math.round(mapinfo.offsetLeft),
      top: Math.round(mapinfo.offsetTop),
      width: mapinfo.clientWidth,
      height: mapinfo.clientHeight
    };

    let xPointIsInner = 11 <= currentPoint.xPoint && currentPoint.xPoint <= maps.width - 11;
    let yPointIsInner = 11 <= currentPoint.yPoint && currentPoint.yPoint <= maps.height - 11;

    console.log(`10 ${currentPoint.xPoint} ${maps.width},\r\n10 ${currentPoint.yPoint} ${maps.height}`);

    return xPointIsInner && yPointIsInner;
  }

  rangePin() {
    //obj, num
    return React.createElement(
      "div",
      {
        "class": "drsElement drsMoveHandle",
        style: {
          left: "30px",
          top: "30px",
          width: "50px",
          height: "100px",
          background: "#dfc"
        }
      },
      "Div 2 Content"
    );
    // return obj.map((coordinate, index) => (
    //   <div
    //     class="rangepin"
    //     id={`rangepinId-${index + num}`}
    //     style={{
    //       left: `${coordinate.xPoint}px`,
    //       top: `${coordinate.yPoint}px`,
    //     }}
    //     onClick={this.changeColorAsSelected.bind(this)}
    //   ></div>
    // ));
  }
  updateState(state) {
    this.setState(state);
  }
  render() {
    const { pinCoordinates } = this.state;
    const rangePin = this.rangePin();
    return React.createElement(
      "div",
      null,
      React.createElement("div", { "class": "pin--stalker", onClick: this.addPin.bind(this) }),
      React.createElement(
        "div",
        { id: "map", onMouseMove: this.moveMouseMove.bind(this) },
        React.createElement(Pins, { init: defa, updateState: this.updateState.bind(this) }),
        rangePin
      ),
      React.createElement(Buttons, { updateState: this.updateState.bind(this) })
    );
  }
}

ReactDOM.render(React.createElement(Box, null), document.getElementById("root"));