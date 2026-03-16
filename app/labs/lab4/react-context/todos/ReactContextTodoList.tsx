"use client";
import { useTodos } from "./todosContext";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";

export function ReactContextTodoForm() {
    const { todo, addTodo, updateTodo, setTodo } = useTodos()!;

    return (
        <ListGroupItem>
            <div className="d-flex align-items-center">
                <FormControl value={todo.title} className="flex-fill me-5"
                    onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
                <div className="d-flex gap-2">
                    <Button onClick={() => updateTodo()}
                        id="wd-update-todo-click"
                        variant="warning"> Update </Button>
                    <Button onClick={() => addTodo()}
                        id="wd-add-todo-click"
                        variant="success"> Add </Button>
                </div>
            </div>
        </ListGroupItem>
    );
}

export function ReactContextTodoItem({ todo }: { todo: { id: string, title: string } }) {
    const { deleteTodo, setTodo } = useTodos()!;

    return (
        <ListGroupItem key={todo.id}>
            <Button onClick={() => deleteTodo(todo.id)}
                id="wd-delete-todo-click"
                className="btn btn-danger float-end"> Delete </Button>
            <Button onClick={() => setTodo(todo)}
                id="wd-set-todo-click"
                className="btn float-end me-2"> Edit </Button>
            {todo.title}
        </ListGroupItem>
    );
}

export default function ReactContextTodoList() {
    const { todos } = useTodos()!;

    return (
        <div id="wd-react-context-todo-list">
            <h2> Todo List </h2>
            <ListGroup>
                <ReactContextTodoForm />
                {todos.map((todo) => (
                    <ReactContextTodoItem key={todo.id} todo={todo} />
                ))}
            </ListGroup><hr />
        </div>
    );
}