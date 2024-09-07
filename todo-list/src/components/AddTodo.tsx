import { Todo } from "@/types/Todo";
import { useState } from "react";

type AddTodoProps = {
    onSubmitTodo: (newTodo: Todo) => void;
};

export default function AddTodo({ onSubmitTodo }: AddTodoProps) {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
                onSubmitTodo(newTodo);
            } else {
                console.error("Erro ao criar tarefa");
            }
        } catch (error) {
            console.error("Erro ao criar tarefa", error);
        }

        //teste
        onSubmitTodo({ id: 4, title, description, isCompleted: false });

        setTitle("");
        setDescription("");
    };

    return (
        <div>
            <h1 className="text-lg">Criar nova tarefa:</h1>
            <form className="flex gap-2" onSubmit={handleSubmit}>
                <input
                    className="p-1 rounded-lg border"
                    type="text"
                    value={title}
                    placeholder="Digite aqui o nome"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    className="p-1 rounded-lg border"
                    type="text"
                    value={description}
                    placeholder="Digite aqui a descrição"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <button
                    className="border-2 border-green-400 rounded-lg p-1 text-green-400 hover:bg-green-400 hover:text-white transition"
                    type="submit"
                >
                    Criar tarefa
                </button>
            </form>
        </div>
    );
}
