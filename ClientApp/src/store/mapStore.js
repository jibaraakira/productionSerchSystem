const com = {
  insertPin: "TYPE_INSERT",
  renderMouseStalker: "TYPE_GET_COORDINATE",
};

const initialState = {
  coordinates: 0,
  count: 0,
  pinFlags: {
    canInsertPin: false,
    canUpdatePin: false,
    canDeletePin: false,
  },
  map: null,
  stalkerPin: null,
};

export const actionCreators = {
  insertPin: () => ({ type: com.insertPin }),
  renderMouseStalker: () => ({ type: com.renderMouseStalker }),
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === com.insertPin) {
    return insertPin(state);
  }
  if (action.type === com.renderMouseStalker) {
    return renderMouseStalker(state);
  }

  return state;
};

function insertPin(state) {
  console.log(state.count + 1);
  return { ...state, count: state.count + 1 };
}

function renderMouseStalker(state) {
  console.log(this);
}

// function read() {
//   const map = this.state.map.getBoundingClientRect();
//   const newCoordinate = {
//     xPoint: event.pageX - Math.round(map.x),
//     yPoint: event.pageY - Math.round(map.y),
//   };
//   return newCoordinate;
// }
