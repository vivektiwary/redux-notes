// action creator are normal js function
let nextTodoId = 0;
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: (nextTodoId++).toString(),
    text,
  };
};

export const addTodo = (text) => ({
  // here parens are required so the compiler understands it
  // as object literal
  //
  // this only contains return statement
  // so we can return the object expression
  {
    type: 'ADD_TODO',
    id: (nextTodoId++).toString(),
    text,
  };
});

// another example

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
};

// the above function can be written as

const mapDispatchToProps = (dispatch, ownProps) => ({
  // consize method notation, which is also part of the es6
    onClick() {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
});
