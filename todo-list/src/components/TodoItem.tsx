"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareCheck,
    faSquare,
    faTrashCan,
    faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";
import { Todo } from "@/types/Todo";
import { useState } from "react";
import EditTodo from "./EditTodo";
import { API_URL } from "../../config";

type TodoItemProps = {
    todo: Todo;
    onIsCompleted: (todo: Todo) => void;
    onDeleted: (id: number) => void;
    onEdited: (todo: Todo) => void;
};

export default function TodoItem({
    todo,
    onIsCompleted,
    onDeleted,
    onEdited,
}: TodoItemProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const toggleIsCompleted = async () => {
        try {
            const response = await fetch(`${API_URL}/todo/complete`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: todo.id,
                    isCompleted: !todo.isCompleted,
                }),
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                const updatedTodo: Todo = data.props;
                onIsCompleted(updatedTodo);
            } else {
                console.error("Erro ao atualizar tarefa");
            }
        } catch (error) {
            console.error("Erro ao atualizar tarefa", error);
        }
    };

    const deleteTodo = async () => {
        try {
            const response = await fetch(`${API_URL}/todo`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: todo.id }),
                credentials: "include",
            });

            if (response.ok) {
                onDeleted(todo.id);
            } else {
                console.error("Erro ao deletar tarefa");
            }
        } catch (error) {
            console.error("Erro ao deletar tarefa", error);
        }
    };

    const toggleEditTodo = () => {
        setIsEditing(!isEditing);
    };

    return (
        <>
            {isEditing ? (
                <EditTodo
                    todo={todo}
                    onSubmitEdit={onEdited}
                    onCloseEdit={toggleEditTodo}
                />
            ) : (
                <div className="flex flex-row justify-between items-center gap-2 p-2 rounded-lg hover:bg-neutral-300 transition">
                    <div className="flex flex-col w-full justify-center">
                        <div>
                            <span>{todo.title}</span>
                            {todo.isCompleted && (
                                <span className="text-green-500 text-sm">
                                    {" "}
                                    - Tarefa completa
                                </span>
                            )}
                        </div>
                        <p className="text-sm">{todo.description}</p>
                    </div>
                    <div className="flex gap-2 text-xl">
                        <button>
                            {todo.isCompleted ? (
                                <FontAwesomeIcon
                                    icon={faSquareCheck}
                                    onClick={toggleIsCompleted}
                                    className="text-green-500"
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faSquare}
                                    onClick={toggleIsCompleted}
                                />
                            )}
                        </button>
                        <button>
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="text-blue-600"
                                onClick={toggleEditTodo}
                            />
                        </button>
                        <button>
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                className="text-red-600"
                                onClick={deleteTodo}
                            />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
