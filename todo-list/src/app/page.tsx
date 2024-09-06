"use client";

import TodoItem from "@/components/TodoItem";
import { Todo } from "@/types/Todo";
import { useEffect, useState } from "react";

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([
        {
            id: 1,
            title: "Corrida",
            description: "correr muito",
            isCompleted: true,
        },
        {
            id: 2,
            title: "Trabalhar",
            description: "foco 100%",
            isCompleted: false,
        },
        {
            id: 3,
            title: "Buscar filha",
            description: "buscar filha na escola",
            isCompleted: false,
        },
    ]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch("api/todos");

                if (response.ok) {
                    const data: Todo[] = await response.json();
                    setTodos(data);
                } else {
                    console.error("Erro ao carregar tarefas");
                }
            } catch (error) {
                console.error("Erro", error);
            }
        };
        fetchTodos();
    }, []);

    const handleUpdateTodo = (updatedTodo: Todo) => {
        setTodos((prevTodo) =>
            prevTodo.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            )
        );
    };

    return (
        <main className="h-screen flex items-center justify-center bg-neutral-800">
            <div className="flex flex-col gap-2 bg-neutral-100 min-w-80 rounded-3xl p-5 w-[50rem]">
                <h1 className="text-xl">Minhas tarefas</h1>
                <hr className="text-black" />
                {todos.map((todo) => (
                    <TodoItem todo={todo} onTodoUpdated={handleUpdateTodo} />
                ))}
            </div>
        </main>
    );
}
