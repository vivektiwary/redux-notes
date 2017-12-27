import todoApp from './reducers';
import { loadState, saveState } from './localStorage';

// const persitedState = loadState;
//
// const store = createStore(
//   todoApp,
//   persitedState
// );
//
// store.subscribe(throttle(() => {
//   saveState({
//     todos: store.getState().todos});
// }, 1000));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// we can refactor the store logic into a separate file.
// configureStore.js

const configureStore = () => {
  const persitedState = loadState;

  const store = createStore(
    todoApp,
    persitedState
  );

  store.subscribe(throttle(() => {
    saveState({
      todos: store.getState().todos});
  }, 1000));

  return store;
}

export default configureStore;
// it is useful to export the configureStore rather than store itself 
// so that if we later write some tests we can easily create as many
// state instances as we want.
//
// so now we can call configureStore from our app.

const store = configureStore();

// we can also extract the render component into a separate component
// which we call root.
render(
  <Root store={store} />,
  document.getElementById('root')
);

// Root.js

const Root = ({ store }) => {
  <Provider store={store}>
    <App />
  </Provider>
}
 
export default Root;
