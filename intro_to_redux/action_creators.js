// in this example our Component has to increment the "id" while
// dispatching the action. But if we see it from separation of
// concern, we would realize that, the component should not
// care about these details and they should be handled else where.
//
// Increament the id in the reducer is also not a good option as
// it will make reducer non-deterministic.
//
// So we will extract that call in a function.

// creating this method is not required, because in redux 
// we care about separation of concern and we keep 
// these function in separate files and call them 
// "action Creators"
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {
  let input;

  return(
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch(addTodo(input.value));
        // dispatch({
        //   type: 'ADD_TODO',
        //   id: nextTodoId++,
        //   text: input.value
        // })
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};

AddTodo = connect()(AddTodo);
