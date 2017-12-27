// es5
// reducer
function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0;
  }
  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  }
  else {
    return state;
  }
}

// es6
// reducer
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
