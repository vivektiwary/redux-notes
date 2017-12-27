import { fetchTodos } from '../api'
import React from 'react';

// the best place to fetch the todos is in the lifecycle hook
// componentDidMount. But we can't change the lifecycle hook
// of generated component.
// So we need to create a component for that.

class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    // we want the fetch todolist to become a part of the
    // redux state. And the only way to get something into the state
    // is to dispatch an action.
    const { filter, receiveTodos } = this.props;
    fetchTodos(filter).then(todos =>
      this.props.recieveTodos(filter, todos);
    );
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
  { onTodoClick: toggleTodo, recieveTodos }
// )(TodoList));
)(VisibleTodoList)); // change the wrapped component as well as we are
// already calling TodoList from our own component.

export default VisibleTodoList;


// actions.js

export const recieveTodos = (filter, response) => ({
  type: 'RECEIVE_TODOS',
  filter,
  response,
});
