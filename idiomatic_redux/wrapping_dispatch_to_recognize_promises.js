import { fetchTodos } from '../api'
import React from 'react';

class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
    );
  }

  render() {
    return <TodoList {...this.props} />;
   }}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  }
};

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo, fetchTodos }
)(VisibleTodoList)); 

export default VisibleTodoList;


// actions.js

import * as api from '../api';

// now we can stop exporting recieveTodos because we are going to use fetchTodos
// directly from the component.
const recieveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});

// asyn action creator
export const fetchTodos = (filter) =>
  api.fetchTodos(filter).then(response) =>
    recieveTodos(filter, response)
  );

// by default redux only allows dispatching plain objects rather than
// promises
//
// We can teach it to recognise promises by decorating it.

// configureStore.js

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;

  if (!console.group) {
    return rawDispatch;
  }
  return (action) => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  }
}

const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(rawDispatch);
    }
    return rawDispatch(action);
  };
};

const configureStore = () {
  const store = createStore(todoApp, persitedState);

  if (process.env.NODE_ENV != 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.dispatch = addPromiseSupportToDispatch(store);
  // the order in which we override the dispatch function is
  // important, if we move this call before the addLoggingToDispatch
  // then the promise will not get resolve and the logs would be 
  // printed.
  //
  // This will happen because when we override the dispatch
  // we are basically wrapping it with some custom function, 
  // in the present order, first dispatch will be wrapped us 
  // with console.log statements which inturn will be wrapped
  // with the promise resolving logic. So the promise resolving
  // logic will be the outermost, which will get executed first.

  return store;
}

export default configureStore;
