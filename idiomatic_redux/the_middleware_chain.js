// configureStore.js

// now they are the first class concept we will rename the middleware names.
// const addLoggingToDispatch = (store) => {
const logger = (store) => {
  // for consistency we are renaming the rawDispatch to next,
  // as the dispatch might gets changed before coming to this function.

  // inside middlewares, there is a certain pattern which we needed to
  // repeat, we are grabbing the value of store.dispatch and storing
  // the value in a variable called next, so that we can call it 
  // later.
  //
  // To make it a part of the middleware contract, we can make 
  // "next" an outside argument just like the "store" before it, 
  // and the "action" after it.
  // const next = store.dispatch;
  //
  // this way the middlewares becomes a function that returns a 
  // function that returns a function, which is not very common
  // in javascript but it is actually very common in functional
  // programming languages.
  // 
  // And this pattern is called "currying".
  return (next) => {
    if (!console.group) {
      return next;
    }

    return (action) => {
      console.group(action.type);
      console.log('%c prev state', 'color: gray', store.getState());
      console.log('%c action', 'color: blue', action);
      const returnValue = next(action);
      console.log('%c next state', 'color: green', store.getState());
      console.groupEnd(action.type);
      return returnValue;
    }
  }
}

// we are renaming rawDispatch to next, as it the next dispatch
// after addLoggingToDispatch function wrapper.
// const addPromiseSupportToDispatch = (store) => {
//
// const promise = (store) => {
  // const next = store.dispatch;
  //
  // the currying style function can get very hard to read, However
  // we can use arrow function and rely on the fact that arrow function
  // can have expression as their body.
  //
  // return (next) => {
  //   return (action) => {
  //     if (typeof action.then === 'function') {
  //       return action.then(next);
  //     }
  //     return next(action);
  //   };
  // };

const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};

const wrapDispatchWithMiddlewares = (store, middlewares) => {
  // as we have defined the ordering we needed to process the
  // middlewares from right to left.
  middlewares.slice().reverse().forEach(middleware =>
    // finally store is not only the injected value, we needed to
    // inject the next middleware as well, which is the previous 
    // value of store.dispatch function.
    //
    // This is done to pass store.dispatch as argument because
    // otherwise the middleware will not get the modified dispatch
    // function.
    store.dispatch = middleware(store)(store.dispatch)
  );
};

const configureStore = () {
  const store = createStore(todoApp, persitedState);

  // this method of override works great, but it is not a good
  // idea to modify the public api with custom function.
  //
  // To get away from this pattern, we will use an array
  // which we will call a middleware.
  const middlewares = [promise];

  if (process.env.NODE_ENV != 'production') {
    // middlewares.push(addLoggingToDispatch(store));
    middlewares.push(logger);
  }

  // finally we would like to fix the order in which middlewares 
  // are specified, they are currently ordered in the order in
  // which dispatch function has been written. But it is more natural
  // to have a orderering in which we want the orverride.

  // middlewares.push(promise);

  wrapDispatchWithMiddlewares(store, middlewares);

  return store;
}

export default configureStore;

