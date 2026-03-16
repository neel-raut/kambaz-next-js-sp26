"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Todo {
    id: string;
    title: string;
}

// Define the context state
interface TodosContextState {
    todos: Todo[];
    todo: Todo;
    addTodo: () => void;
    deleteTodo: (id: string) => void;
    updateTodo: () => void;
    setTodo: (todo: Todo) => void;
}

// Create the context
const TodosContext = createContext<TodosContextState | undefined>(
    undefined,
);

// Create the provider component
export const TodosProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([
        { id: "1", title: "Learn React" },
        { id: "2", title: "Learn Node" },
    ]);
    const [todo, setTodo] = useState<Todo>({ id: "0", title: "Learn Mongo" });

    const addTodo = () => {
        const newTodo = { ...todo, id: new Date().getTime().toString() };
        setTodos([...todos, newTodo]);
        setTodo({ id: "0", title: "" });
    };

    const deleteTodo = (id: string) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const updateTodo = () => {
        const newTodos = todos.map((item) =>
            item.id === todo.id ? todo : item
        );
        setTodos(newTodos);
        setTodo({ id: "0", title: "" });
    };

    const value: TodosContextState = {
        todos,
        todo,
        addTodo,
        deleteTodo,
        updateTodo,
        setTodo
    };

    return (
        <TodosContext.Provider value= { value } >
        { children }
        </TodosContext.Provider>
    );
};

// Create a custom hook to use the counter context
export const useTodos = () => {
    const context = useContext(TodosContext);
    return context;
};