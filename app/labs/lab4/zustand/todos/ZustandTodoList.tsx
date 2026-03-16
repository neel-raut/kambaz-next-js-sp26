"use client";
import { useTodosStore } from "./useTodoStore";
import { ListGroup, ListGroupItem, Button, FormControl } from "react-bootstrap";

export function ZustandTodoItem({ todo }: { todo: { id: string, title: string } }) {
    const { deleteTodo, setTodo } = useTodosStore((state) => state);

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

export function ZustandTodoForm() {
    const { todo, addTodo, updateTodo, setTodo } = useTodosStore((state) => state);

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

export default function ZustandTodoList() {
    const { todos } =
        useTodosStore((state) => state,
    );

    return (
        <div id="wd-zustand-todo-list">
            <h2>Zustand Todo List</h2>
            <ListGroup>
                <ZustandTodoForm />
                {todos.map((todo) => (
                    <ZustandTodoItem key={todo.id} todo={todo} />
                ))}
            </ListGroup><hr />
        </div>
    );
}