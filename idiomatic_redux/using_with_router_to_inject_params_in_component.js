import React, { PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './App';


const Root = ({ store }) => {
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/(:filter)' component={App} />
    </Router>
  </Provider>
}
 
Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;


// FilterLink.js
import React from 'react';
import { Link } from 'react-router';

const FilterLink = ({ filter, children }) => (
  <Link
    to={filter === 'all' ? '' : filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </Link>
);

export default FilterLink;

// visibilleTodoList.js

import { withRouter } from 'react-router';

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(
    state.todos,
    // state.visibilityFilter
    ownProps.params.filter || 'all'
  ),
});

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));

export default VisibleTodoList;

// app.js

// the params props is the once which react router inject in the component.
const App = ({ params }) => (
  <div>
    <AddTodo />
      {/* we are passing filter params to App component implicitely using
        react router. But the filter params is not being used in the
        app component, so there is no point of keep it in the app
        component.
      */}
    {/* <VisibleTodoList  */}
    {/*   filter={params.filter || 'all'} */}
    {/* /> */}
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;

