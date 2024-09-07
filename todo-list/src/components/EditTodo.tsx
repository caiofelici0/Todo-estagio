import { Todo } from "@/types/Todo";
import { useState } from "react";

type EditTodoProps = {
    todo: Todo;
    onSubmitEdit: (todo: Todo) => void;
    onCloseEdit: () => void;
};

export default function EditTodo({
    todo,
    onSubmitEdit,
    onCloseEdit,
}: EditTodoProps) {
    const [title, setTitle] = useState<string>(todo.title);
    const [description, setDescription] = useState<string>(todo.description);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`api/todo/${todo.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                }),
            });

            if (response.ok) {
                const EditTodo: Todo = await response.json();
                onSubmitEdit(EditTodo);
            } else {
                console.error("Erro ao editar tarefa");
            }
        } catch (error) {
            console.error("Erro ao editar tarefa", error);
        }

        //teste
        onSubmitEdit({
            id: todo.id,
            title,
            description,
            isCompleted: todo.isCompleted,
        });

        onCloseEdit();
    };

    return (
        <div className="bg-neutral-300 p-2 rounded-lg">
            <div className="flex justify-between">
                <h1 className="text-lg">Editando tarefa:</h1>
                <button onClick={onCloseEdit}>cancelar</button>
            </div>
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
                    className="border-2 border-blue-600 rounded-lg p-1 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                    type="submit"
                >
                    Confirmar
                </button>
            </form>
        </div>
    );
}
