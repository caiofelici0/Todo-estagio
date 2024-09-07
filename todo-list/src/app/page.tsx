"use client";

import AddTodo from "@/components/AddTodo";
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
                const response = await fetch("api/todos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data: Todo[] = await response.json();
                    setTodos(data);
                } else {
                    console.error("Erro ao carregar tarefas");
                }
            } catch (error) {
                console.error("Erro ao carregar tarefas", error);
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

    const handleAddTodo = async (title: string, description: string) => {
        try {
            const response = await fetch("api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    isCompleted: false,
                }),
            });

            if (response.ok) {
                const newTodo: Todo = await response.json();
                setTodos((prevTodos) => [...prevTodos, newTodo]);
            } else {
                console.error("Erro ao criar tarefa");
            }
        } catch (error) {
            console.error("Erro ao criar tarefa", error);
        }

        //teste
        setTodos((prevTodos) => [
            ...prevTodos,
            { id: 4, title, description, isCompleted: false },
        ]);
    };

    return (
        <main className="h-screen flex items-center justify-center bg-neutral-800">
            <div className="flex flex-col gap-2 bg-neutral-100 min-w-80 rounded-3xl p-5 w-[50rem]">
                <h1 className="text-xl font-bold">Minhas tarefas</h1>
                <hr className="border-neutral-800" />
                <AddTodo onSubmitTodo={handleAddTodo} />
                <hr className="border-neutral-800" />
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onIsCompleted={handleUpdateTodo}
                    />
                ))}
            </div>
        </main>
    );
}
