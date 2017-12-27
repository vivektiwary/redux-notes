import React, { PropTypes } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './App';



const Root = ({ store }) => {
  <Provider store={store}>
    {/* // it should be inside Provider so that any component render
      by the router will have access to the store
    */}
    <Router history={browserHistory}>
      {/* we are rendering the app component at the root 
      depending on the version of react-router
      the routes will default to #(hash) routing or browserHistory
      */}
      {/* to make any parameter option just wrap it in () */}
      {/* react-router make the filer params available to App component 
      in special props called "params"
      */}
      <Route path='/(:filter)' component={App} />
    </Router>
  </Provider>
}
 
Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;


// footer.js
<p>
  show:
  {" "}
  <FilterLink filter="SHOW_ALL">
    All
  </FilterLink>
  {", "}
  <FilterLink filter="SHOW_ACTIVE">
    Active
  </FilterLink>
  {", "}
  <FilterLink filter="SHOW_COMPLETED">
    Completed
  </FilterLink>
</p>

  // to use react router we will change the above code to 

<p>
  show:
  {" "}
  <FilterLink filter="all">
    All
  </FilterLink>
  {", "}
  <FilterLink filter="active">
    Active
  </FilterLink>
  {", "}
  <FilterLink filter="completed">
    Completed
  </FilterLink>
</p>

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
//
// We need to make changes in the mapStateToProps call for 
// visibleTodoList, and instead of getting the visibilityFilter 
// from store, we can get that from the ownProps of the container.
const mapStateToProps = (state) => ({
  todos: getVisibleTodos(
    state.todos,
    state.visibilityFilter
  ),
});
// we can change the above code with below one
const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(
    state.todos,
    ownProps.filter
  ),
});


// app.js

// the params props is the once which react router inject in the component.
const App = ({ params }) => (
  <div>
    <AddTodo />
    <VisibleTodoList 
      <!-- this filter prop should be the same params which are passing 
       in the route configuration.
       Since the filter is empty on the root path, we are passing 'all'
       as fallback.
      -->
      filter={params.filter || 'all'}
    />
    <Footer />
  </div>
);
// but once common problem with enabling routing is that, when
// we reload the page with the routes, it will throw 404 because
// the dev server will not be configured correctly to serve
// anything but the root path.

// Use express with devServer middleware in development.

// In this case, the "react-router" became the source of truth
// for the components
export default App;
