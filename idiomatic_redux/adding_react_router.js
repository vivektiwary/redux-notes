// npm install react-router

// Root.js

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
      <Route path='/' component={App} />
    </Router>
  </Provider>
}
 
Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;
