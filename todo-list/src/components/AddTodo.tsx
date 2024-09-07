import { useState } from "react";

type AddTodoProps = {
    onSubmitTodo: (title: string, description: string) => void;
};

export default function AddTodo({ onSubmitTodo }: AddTodoProps) {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmitTodo(title, description);
        setTitle("");
        setDescription("");
    };

    return (
        <div>
            <h1 className="text-lg">Adicionar tarefa:</h1>
            <form className="flex gap-2" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    placeholder="Digite aqui o nome"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
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
