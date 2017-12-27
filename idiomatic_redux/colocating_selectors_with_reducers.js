import { getVisibleTodos } from  '../reducers';
// here our map state to props is calling getVisibleTodos and
// passing the todos slice of the store.
//
// However, if we change the structure of the store, we needed to
// remember this call sight.
//
// Alternatively we can move out the getVisibleTodos function out
// of our view layer, and place it in a file which knows best about the
// state todos internal structure.
// The file that determines the internal structure of the todos, is
// the file that contains the todos 'reducers'.
const mapStateToProps = (state, { params }) => ({
  // but we are still dependent on the state after moving the function
  // to the reducer file because we read the todos from the state. But 
  // the actual method of reading todos may change in the future. 
  // 
  // To solve this we will add one more selector in the root reducer file,
  // which will give us the todos.
  // the top level import will have all the knowledge about the state 
  // shape so we can just pass the whole state of the application.
  //
  // So in this case even if the structure of the store changes
  // we will not be changing the components only change in getVisibleTodos
  // will be required.
  todos: getVisibleTodos(state, params.filter || 'all')
});

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));

export default VisibleTodoList;



// todos_reducer.js

// the convention we should follow is simple, the default export is 
// always the reducer function. But any named exports starting with 
// "get" is a function that prepares the data that could be displayed
// by the UI. We usually call this function "selectors" because they
// select something from the current state.
//
// named export
//
// In the reducer, the state corresponds to the state of the particular 
// reducer, so we will follow the same convention in selector, where
// the state argument will corresponds to the state of the exported reducer
// of that file.

export const getVisiblestate = (state, filter) => {
  switch (filter) {
    case 'all':
      return state;
    case 'completed':
      return state.filter(t => t.completed);
    case 'active':
      return state.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};

// root reducer 

import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
  todos,
});

export default todoApp;

// selector
export const getVisibleTodos = (state, filter) => 
  fromTodos.getVisibleTodos(state.todos, filter);
  // this state corresponds to the state of the combineReducers.
  // Now we would like to call the 'getVisibleTodos' function 
  // defined in the todos file.
  // But we can't use named import as we have a function with
  // exactly the same name in this scope.
  // So the below import won't work.
  // import todos, getVisibleTodos from './todos';
  //
  // To get away with that, we can use the "namespace" import syntax
  // that puts all the import on an objet.
