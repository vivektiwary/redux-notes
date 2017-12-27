import { fetchTodos } from '../api'
import React from 'react';

// the best place to fetch the todos is in the lifecycle hook
// componentDidMount. But we can't change the lifecycle hook
// of generated component.
// So we need to create a component for that.

class VisibleTodoList extends React.Component {
  componentDidMount() {
    // it would be convenient if the filter will be available as props.
    // that requires change in mapStateToProps
    fetchTodos(this.props.filter).then(todos => 
      console.log(this.props.filter, toods
      )
    )
    // this will run only once
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(this.props.filter, todos);
      );
    }
  }

  render() {
    return <TodoList {...this.props} />;
   }}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  }
};

// we can't declare the constant as same name as class, but we
// can re-assign it.
// const VisibleTodoList = withRouter(connect(
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
// )(TodoList));
)(VisibleTodoList)); // change the wrapped component as well as we are
// already calling TodoList from our own component.

export default VisibleTodoList;
