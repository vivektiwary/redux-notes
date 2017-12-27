// todos.js reducer
// 
// here our state is an array of todos object,
// however in real app we will probably have more than
// single array and then todos with same ids in different
// arrays might get out of sync.
//
// To solve this we should treat our state as database.
// and we should keep the todos in a object indexed by
// the ids of todos.
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action),
      ];
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action));
    default:
      return state;
  }
};

// the above code changes to
//
// we have renamed our reducers to 'byId' and rather than
// add a new item at the end or map over every item, now it is
// going to change the value in the lookup table.
//
// Both toggleTodo and addTodo logic is going to be the same.
// We want to return a new lookup table where the value under the 
// "id" in the action is going to be the result of calling the reducer
// on the previous value under this "id" and the action.
const byId = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
    case 'TOGGLE_TODO':
      // this is still reducer composition but with an object
      // rather than an array.
      // 
      // we are also using the object spread operator here and 
      // it is not the part of es6, so we need a babel plugin
      // "transform-object-rest-spread"
      //
      // and we need to install a plugin called 'babel-plugin-transform-object-rest-sprea
      return {
        ...state,
        [action.id]: todo(state[action.id], action),
      };
    default:
      return state;
  }
};

// now we will add another reducers that keep track of all the added ids
// We will keep the todos themselves in the byId map now. So the state of
// this reducer is an array of ids rather than array of todos.

const allIds = (state = [], action) => {
  switch (action.type) {
      // here we only care about 'ADD_TODO' action and we will return
      // all the ids with this id as the last item.
    case 'ADD_TODO':
      return [...state, action.id];
    default:
      return state;
  }
};

// finally we still need to export a single reducer out of this file
// so we are going to use combine reducers
const todos = combineReducers({
  byId,
  allIds,
});

// we can use combineReducers as many times as we like. We don't have
// to only use it on the top level reducer. In fact it is very common
// that as our app grows we will use combineReducers at several places.
//
// now the state shape has been changed, we needed to change the selectors
// that rely on it.

// the state object in getVisibleTodos is now going to contain byId and
// allIds fields because it corresponds to the state of the combineReducers.
//
// Since we dont have array of todos any more, we will write a selector
// that is going to calculate for us. We wont export it as we are only
// planning to use it internally.

const getAllTodos = (state) =>
  state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case 'all':
      // return state;
      return allTodos;
    case 'completed':
      // return state.filter(t => t.completed);
      return allTodos.filter(t => t.completed);
    case 'active':
      // return state.filter(t => !t.completed);
      return allTodos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};
