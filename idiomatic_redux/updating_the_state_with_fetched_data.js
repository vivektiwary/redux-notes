// todos.js reducer

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

const byId = (state = {}, action) => {
  switch (action.type) {
    // case 'ADD_TODO':
    // case 'TOGGLE_TODO':
    //   return {
    //     ...state,
    //     [action.id]: todo(state[action.id], action),
    //   };
    case 'RECEIVE_TODOS':
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  if (action.filter !== 'all') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const activeIds = (state = [], action) => {
  if (action.filter !== 'active') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id)
    default: 
      return state;
  }
}

const completedIds = (state = [], action) => {
  if (action.filter !== 'completedIds') {
    return state;
  }
  switch (action.type) {
    case 'RECEIVE_TODOS':
      return action.response.map(todo => todo.id)
    default: 
      return state;
  }
}

const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds
})

const todos = combineReducers({
  byId,
  idsByFilter,
});

// const getAllTodos = (state) =>
//   state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId[id]);
  // in a real app we will not have access to all todos, 
  // so we will remove the call to allTodos.
  // Also there is no need to filter on the client anymore
  // as we will be sending the data from the server.
  //
  // const allTodos = getAllTodos(state);
  // switch (filter) {
  //   case 'all':
  //     return allTodos;
  //   case 'completed':
  //     return allTodos.filter(t => t.completed);
  //   case 'active':
  //     return allTodos.filter(t => !t.completed);
  //   default:
  //     throw new Error(`Unknown filter: ${filter}.`);
  // }
};
