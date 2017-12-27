const counter = (state = 0, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const { createStore } = Redux;

// the stores binds together the 3 principles of redux.
// 1. Holds current application state object
// 2. It lets you dispatch action.
// 3. When we create it, we needed to tell it the reducers which
// tells how the state is updated with actions.

const store = createStore(counter);

// 3 methods of redux store.
// 1. getState(): gets the current state of the redux store.
// 2. dispatch(): lets you dispatch action to change the state of the application
// 3. subscribe(): lets you register the callback, that the redux store 
// will call, any time an action has been dispatched.

// console.log(store.getState());
//
// store.dispatch({ type: 'INCREMENT' });
// console.log(store.getState());

store.subscribe(() => {
  document.body.innerText = store.getState();
});


// re-implementing createStore

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch();

  return { getState, dispatch, subscribe }
}
