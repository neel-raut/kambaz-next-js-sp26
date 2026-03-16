import { create } from "zustand";

interface Todo {
    id: string;
    title: string;
};

interface TodosState {
    todos: Todo[];
    todo: Todo;
    addTodo: () => void;
    deleteTodo: (id: string) => void;
    updateTodo: () => void;
    setTodo: (todo: Todo) => void;
}

export const useTodosStore = create<TodosState>((set) => ({
    todos: [
        { id: "1", title: "Learn React" },
        { id: "2", title: "Learn Node" },
    ],
    todo: { id: "0", title: "Learn Mongo" },

    addTodo: () => {
        set((state) => ({
            todos: [...state.todos, { ...state.todo, id: Date.now().toString() }],
            todo: { id: "0", title: "" },
        }));
    },

    deleteTodo: (id) => {
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        }));
    },

    updateTodo: () => {
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === state.todo.id ? state.todo : todo
            ),
            todo: { id: "0", title: "" },
        }));
    },

    setTodo: (todo) => set({ todo }),

}));
