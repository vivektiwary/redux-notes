const AddTodo = (props, { store }) => {
  const state = store.getState();
  return(
    <div>
      <h2> { props.todos } </h2>
      <h1> { state } </h1>
    </div>
  )
}
AddTodo.contextTypes = {
  store: React.PropTypes.object
};

// it returns the Props, which should be passed to the 
// component and they depend on the "state"
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos, 
      state.visibilityFilter
    )
  }; 
}

// it returns the Props, which should be passed to the 
// component and they depend on the "dispatch" method
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => { 
      dispatch({
        type: 'TOGGLE_TODO'
        id
      })
    }
  };
}

// mapStateToProps and mapDispatchToProps together, our function
// describe a container component so well that instead of writing the
// below component, we can generte it using the "connect" function
// from react-redux library.

const { connect } = ReactRedux;
// import { connect } from 'react-redux'

// instead of declaring a class we will declare a variable.
const Footer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);
// now there is no need for the below wrapper container for 
// managing store subscription and maintaining context.
// The above call to connect will create a container component
// which will have our component inside. And the container
// component will calculate props by "merging mapStateToProps,
// mapDispatchToProps, and ownProps"


// for more example see the code at the end of this file


// class Footer extends Component {
//   componentDidMount() {
//     const { store } = this.context; // use the store from context provided by Provider
//     this.unsubscribe = store.subscribe(() => {
//       this.forceUpdate(); 
//     });
//   }
//
//   componentWillUnmount() {
//     this.unsubscribe(); // un-subscribe when out of memory
//   }
//
//   render() {
//     const props = this.props;
//     const state = store.getState(); 
//
//     return(
//       <Link />
//     )
//   }
// }
// For context to work we needed to specify the below code, if 
// we don't specify the below code, the context will not work.
//
// Footer.contextTypes = {
//   store: React.PropTypes.object
// }
//
const TodoApp = () => {
  <div>
    <AddTodo 
      todos={ getVisibleTodos(state.todos, state.visibilityFilter) }
    />
    <Footer />
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


// demonstrating the use of connect to wrap a component
// which uses either "dispatch" or "state" from the redux.

let nextTodoId = 0;
const AddTodo = (props, { store }) => {
  let input;

  return(
    <div>
      <input ref={ node => {
        input = node;
      }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        })
        input.value = '';
      }}>
      Add Todo
      </button>
    </div>
  );
};

AddTodo.contextTypes = {
  store: React.PropTypes.object
}

// in the above example rather than reading store from the context
// we can read "dispatch" as we are only using that
// For that we can create a container Component using connect
// which will inject the dispatch prop

// we have changed AddTodo from "const" to "let" so that
// we can reassign it with the wrapped function without changing
// the functionality.
let AddTodo = ({ dispatch }) => {
  let input;

  return(
    <div>
      <input ref={ node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        })
        input.value = '';
      }}>
      Add Todo
      </button>
    </div>
  );
};

// Now there will be no need for contextTypes as the 
// Component created by connect function will take care 
// of reading the "store from the context".

// AddTodo.contextTypes = {
//   store: React.PropTypes.object
// }

AddTodo = connect(
  // as we are not using anything on the state, we are returning
  // empty object.
  //
  // As we are not doing anything with the state, there is no need
  // to subscribe to the store. So we will return "null", which will
  // tell connect that there is no need to subscribe to the store.
  //
  // state => {
  //   return {};
  // },
  null,

  // as only dispatch method is required, we are passing the 
  // dispatch method in the object. Note here that we are using
  // es6 object style, where if the name of the key and value are
  // same, we can omit the key.
  //
  // If we pass "null" in dispatch, we will get the dispatch as prop
  // in our container without specifing anything.
  //
  // dispatch => {
  //   return { dispatch }
  // }
  null
  // so we can remove all arguments and by default "dispatch" will 
  // be passed and we will not subscribe to the store.
)(AddTodo);

AddTodo = connect()(AddTodo);


// Another example

const mapStateToProps = (state, ownProps) => {
  // it is common to use container Component's props in mapStateToProps that is
  // why props are passed as second argument.
  return {
    // the props is FilterLink props
    // active: props.filter === state.visibilityFilter
    active: ownProps.filter === state.visibilityFilter
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  onClick: () => {
    dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: ownProps.filter
    })
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

class FilterLink extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    <Link
      active={
        props.filter ===
          state.visibilityFilter
      }
      onClick={() =>
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter: props.filter
        })
      }
    >
      {props.children}
    </Link>
  }
}

FilterLink.contextTypes = {
  store: React.PropTypes.object
}
