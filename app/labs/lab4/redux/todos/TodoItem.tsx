import { Button, ListGroupItem } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: { todo: {id: string, title: string } }) {
  const dispatch = useDispatch();
    return (
      <ListGroupItem key={todo.id}>
        <Button onClick={() => dispatch(deleteTodo(todo.id))}
                id="wd-delete-todo-click"
                className="btn btn-danger float-end"> Delete </Button>
        <Button onClick={() => dispatch(setTodo(todo))}
                id="wd-set-todo-click"
                className="btn float-end me-2"> Edit </Button>
        {todo.title}    </ListGroupItem>
    );
}