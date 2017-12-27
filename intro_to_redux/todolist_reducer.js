// reducer composition
const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
}

// Although making the store an array works for 
// simple application, it is not scalable.
// See down for "composition using objects"

const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
      // return [
      //   ...state,
      //   {
      //     id: action.id,
      //     text: action.text,
      //     completed: false
      //   }
      // ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
      // return state.map(todo => {
      //   if (todo.id !== action.id) {
      //     return todo;
      //   }
      //
      //   return {
      //     ...todo,
      //     completed: !todo.completed
      //   };
      // })
    default:
      return state;
  }
};


// Composition using objects

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const todoApp = (state = {}, action) => {
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: visibilityFilter(
      state.visibilityFilter,
      action
    )
  }
}

const store = createStore(todoApp); // reducer composition


// the above pattern is so common in reducer that there is 
// a function for that.

const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

// name your reducers after the key name of the store.
//
// because the key name of the store and reducers are same, we can
// use the below syntax of es6.


const { combineReducers } = Redux;
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp); // reducer composition
