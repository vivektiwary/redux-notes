class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      // anytime the store state changes, force update 
      // the component
      this.forceUpdate(); 
    });
  }

  componentWillUnmount() {
    this.unsubscribe(); // un-subscribe when out of memory
  }

  render() {
    const props = this.props;
    const state = store.getState(); 

    // there is a problem with the approach of the above code.
    // As we are not subscribed to the store, we will
    // not get the correct values, it will be stale.
    //
    // to solve this problem, we can move the store subscription
    // login to component lifecycle hooks.

    return(
      <Link />
    )
  }
}


// passing store using props.

//NOTE: Why not use a single global store variable.
// 1. While testing we would want to provide a different mock store.
// 2. It makes it very hard to implement universal applications that do server side rendering
// (On server we want to supply different store for different users as the data will be different)

const TodoApp = ({ store }) => {
  <div>
    <AddTodo store={store} />
    <Footer store={store} />
  </div>
};

const { createStore } = Redux;

ReactDOM.render(
  <TodoApp store={createStore(TodoApp)} />,
  document.getElementById('root');
)


// there are a lot of boilerplate code which we have to write, to 
// make store available to all the components.
//
// But there is another way of doing this, using "context" concept 
// in React.

// for functional Components the context is passed as 2nd arguments.
const AddTodo = (props, { store }) => {
  return(
    const state = store.getState();
    <h1> { state } </h1>
  )
}
AddTodo.contextTypes = {
  store: React.PropTypes.object
}

class Footer extends Component {
  componentDidMount() {
    const { store } = this.context; // use the store from context provided by Provider
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate(); 
    });
  }

  componentWillUnmount() {
    this.unsubscribe(); // un-subscribe when out of memory
  }

  render() {
    const props = this.props;
    const state = store.getState(); 

    return(
      <Link />
    )
  }
}
// For context to work we needed to specify the below code, if 
// we don't specify the below code, the context will not work.
//
Footer.contextTypes = {
  store: React.PropTypes.object
}

const TodoApp = ({ store }) => {
  <div>
    <AddTodo store={store} />
    <Footer store={store} />
  </div>
};

class Provider extends React.Component {
  // the store passed in as props in this component 
  // will be made available to all the Components and thier 
  // children and grand-children using a feature called "context".
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render() {
    return this.props.children;// it just returns all the children
  }
}

// there is an important condition for the "context" to work.
// 'You have to specify child context types on the components that
// define getChildContext()

// If we don't specify the below thing, no child will recieve the
// context
Provider.childContextTypes = {
  store: React.PropTypes.object
};

const { createStore } = Redux;

ReactDOM.render(
  <Provider store = { createStore(todoApp)}>
    <TodoApp />,
  </Provider>
  document.getElementById('root');
)

// Provider is so common that, it is included in a library called
// React-Redux(React binding to redux library)

const { Provider } = ReactRedux;
//
