// we want to persist the store in the localStorage using browser
// localStorage api.

import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState } from './localStorage';

const persitedState = loadState;

const store = createStore(
  todoApp,
  persitedState
);

// we wanted to save the state whenever state changes
store.subscribe(() => {
  // saveState(store.getState());

  // in this case everything will be preserved, but we don't want
  // that, we only wanted to preserve the data and not the UI state.
  //
  // to fix this, rather than passing the whole state, we will pass 
  // the part of the store which has todos data
  saveState({
    todos: store.getState().todos
  });
});

// in this case there is a bug, if we try to add a todo after
// loading from the localStorage, react will throw error 'two children with
// same key 0'
// 
// because we are using nextTodo counter while adding the todo and
// when the applications loads the counter will be zero, so react complains
//
// To fix this, we can generate a uniqe id using 'node-uuid'
// require('node-uuid').v4(), v4 is an standard, it generate
// a unique string everytime.
//
//
// there is only one thing left, we are calling the saveState inside
// the subscribe listeners, so it gets called everytime the store
// changes. However, we would like to avoid the saveState calling often 
// because it uses the expensive JSON.stringify() operation.
//
// To solve this, we can use "loadash" library which includes a 
// handy utility called "throttle". So wrapping our utility in
// throttle call ensures that the function we are passing will not
// get called more often than the number of miliseconds we specify.
store.subscribe(throttle(() => {
  saveState({
    todos: store.getState().todos});
}, 1000));

// Now even if the store gets updated really fast, we have a guarantee
// that we only write to localStorage atmost once a second.
//
// now we can import the throttle from loadash, but we are only importing
// from a file called throttle, so we don't end up the whole loadash
// in our bundle just because of a single function.
import throttle from 'loadash/throttle';


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// localStorage.js

// function to load the state
export const loadState = () => {
  // it is important to wrap the call in try catch
  // because localStorage.getItem call may fail if the 
  // user privacy mode does not allow the use of localStorage.
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      // if the serializedState is null return undefined 
      // to let the reducers initialize the state instead
      return undefined;
    }
    // however if the serializedState string exists, we are going to
    // use JSON.parse in order to turn it in state object.
    return JSON.parse(serializedState);
  } catch(err) {
    // in case of any error, play safe and return undefined so the
    // reducers can initialize the store.
    return undefined;
  }
}

// function to save the state to localStorage

export const saveState = (state) => {
  try{
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch(err) {
    // Ignore write errors, but we can log them as well
  }
};

