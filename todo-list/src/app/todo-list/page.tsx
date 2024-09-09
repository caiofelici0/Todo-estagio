"use client";

import AddTodo from "@/components/AddTodo";
import TodoItem from "@/components/TodoItem";
import { Todo } from "@/types/Todo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(
                    "http://api-todo-estagio-production.up.railway.app:8080/todo/",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    const todos: Todo[] = data.map(
                        (todo: { props: Todo }) => todo.props
                    );
                    setTodos(todos);
                    console.log(data);
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
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            )
        );
    };

    const handleAddTodo = async (newTodo: Todo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const handleDeleteTodo = (id: number) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const handleEditTodo = (editedTodo: Todo) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === editedTodo.id ? editedTodo : todo
            )
        );
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(
                "http://api-todo-estagio-production.up.railway.app:8080/user/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (response.ok) {
                router.push("/");
            } else {
                console.error("Erro ao fazer logout");
            }
        } catch (error) {
            console.error("Erro ao fazer logout", error);
        }
    };

    return (
        <main className="h-screen flex items-center justify-center bg-neutral-800">
            <div className="flex flex-col gap-2 bg-neutral-100 min-w-80 rounded-3xl p-5 w-[50rem]">
                <div className="flex justify-between">
                    <h1 className="text-xl font-bold">Minhas tarefas</h1>
                    <button onClick={handleLogout}>Sair</button>
                </div>
                <hr className="border-neutral-800" />
                <AddTodo onSubmitTodo={handleAddTodo} />
                <hr className="border-neutral-800" />
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onIsCompleted={handleUpdateTodo}
                        onDeleted={handleDeleteTodo}
                        onEdited={handleEditTodo}
                    />
                ))}
            </div>
        </main>
    );
}
