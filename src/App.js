import React from "react";
import "./App.css";

import { createStore, combineReducer, combineReducers } from "redux";
import { Provider, connect } from "react-redux";

// Action
const novel = "add_number";
const sakib = "subtract_number";

const add = () => ({
  type: novel,
  payload: 1,
});
const substract = () => ({
  type: sakib,
  payload: 5,
});

// Reducer
const FirstReducer = (state = { number: 1 }, action) => {
  if (action.type === novel) {
    return {
      ...state,
      number: state.number + action.payload,
    };
  } else if (action.type === sakib) {
    return {
      ...state,
      number: state.number - action.payload,
    };
  }
  return state;
};

// RootReducer

const RootReducer = combineReducers({
  ABC: FirstReducer,
  // other: otherReducer,
});

// Store
const store = createStore(
  RootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // to see redux dev tool
);

// mapState to props
const mapStateToProps = (state) => {
  return {
    number: state.ABC.number,
  };
};

//map dispatch to props
const mapDispatchToProps = (dispatch) => ({
  addFunc: () => dispatch(add()),
  substractFunc: () => dispatch(substract()),
});

const Counter = (props) => (
  <div>
    <h1>Counter :{props.number}</h1>
    <input type='button' value='ADD' onClick={props.addFunc} />
    <input type='button' value='SUBSTRACT' onClick={props.substractFunc} />
  </div>
);

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

const App = () => (
  <Provider store={store}>
    <ConnectedCounter />
  </Provider>
);

export default App;
