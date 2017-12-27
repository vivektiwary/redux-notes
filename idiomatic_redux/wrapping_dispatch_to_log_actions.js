// configureStore.js

const addLoggingToDispatch = (store) => {
  // wrapping up the redux dispatch method
  const rawDispatch = store.dispatch;

  // console group api might not be supported in some browser
  if (!console.group) {
    return rawDispatch;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    // we can also style our console log
    console.log('%c action', 'color: blue', action);
    // the calling code will not be able to distinguish between
    // this code and the actual dispatch call.
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}

const configureStore = () {
  const persitedState = loadState();

  const store = createStore(
    todoApp,
    persitedState
  );

  // add some logs
  // it's not a good idea to log in production
  // so we add a gate saying if not in production
  // then log it.
  // this will only work if we use env plugin for webpack.
  if (process.env.NODE_ENV != 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos});
  }, 1000));

  return store;
}

export default configureStore;
