// configureStore.js
import { applyMiddleware } from 'redux';

const logger = (store) => (next) => {
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

const promise = (store) => (next) => (action) => {
  if (typeof action.then === 'function') {
    return action.then(next);
  }
  return next(action);
};

// middlewares were not helpful if everybody has to implment their own.
// so we will remove the below function and user applyMiddleware from redux.
// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares.slice().reverse().forEach(middleware =>
//     store.dispatch = middleware(store)(store.dispatch)
//   );
// };



const configureStore = () {
  const middlewares = [promise];
  if (process.env.NODE_ENV != 'production') {
    middlewares.push(logger);
  }

  // promise middlewares and logger middleware are available 
  // in the npm packages.

  return createStore(
    todoApp,
    persitedState,
    applyMiddleware(...middlewares) // this is called enhancer and its optional
  );
}

export default configureStore;
