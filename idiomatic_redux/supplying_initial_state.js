// when we create a redux store, its initial state is 
// determined by the root reducer, 
//
// in this case the root reducer is the result of calling 
// combineReducers

import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

export default todoApp;

// as the reducers are autonomous they define their initial state
// as todos reducers initial state is an array
// and visibilityFilter initial state is 'SHOW_ALL'
// so in this case the initial state of the root reducer will be following
// {
//  todos: [],
//  visibilityFilter: 'SHOW_ALL'
//  }

const store = createStore(todoApp);
// here if we console.log the store we will get the above structure

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


// However, sometimes we want to load some existing data into the app
// synchronouly before it starts. 

const persitedState = {
  todos: [{
    id: '0',
    text: 'Welcome back!',
    completed: false,
  }],
};

// for example we wanted to load above slice of the store from the session.
//
// Redux allow us to pass the persitedState as the second argument to
// createStore.

const store = createStore(
  todoApp,
  persitedState
);

// it will override the value provided by the reducers

