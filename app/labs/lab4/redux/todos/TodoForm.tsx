import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
    return (
      <ListGroupItem>
        <div className="d-flex align-items-center">
            <FormControl value={todo.title} className="flex-fill me-5"
                onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }/>
            <div className="d-flex gap-2">
            <Button onClick={() => dispatch(updateTodo(todo))}
                    id="wd-update-todo-click"
                    variant="warning"> Update </Button>
            <Button onClick={() => dispatch(addTodo(todo))}
                    id="wd-add-todo-click"
                    variant="success"> Add </Button>
            </div>
        </div>
      </ListGroupItem>
  );
}
  