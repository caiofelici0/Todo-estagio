"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import {
    faSquareCheck,
    faSquare,
    faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { Todo } from "@/types/Todo";

type TodoItemProps = {
    todo: Todo;
    onTodoUpdated: (todo: Todo) => void;
};

export default function TodoItem({ todo, onTodoUpdated }: TodoItemProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleIsCompleted = async () => {
        try {
            const response = await fetch(`api/todo/${todo.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ isCompleted: !todo.isCompleted }),
            });

            if (response.ok) {
                const updatedTodo: Todo = await response.json();
                onTodoUpdated(updatedTodo);
            } else {
                console.error("Erro ao atualizar tarefa");
            }
        } catch (error) {
            console.error("Erro ao atualizar tarefa", error);
        }

        //teste
        todo.isCompleted = !todo.isCompleted;
        onTodoUpdated(todo);
    };

    return (
        <div className="flex flex-row justify-between items-center gap-2">
            {isOpen ? (
                <div className="flex flex-col bg-neutral-400 p-2 rounded-lg gap-1 w-full justify-center">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <h2 className="text-lg">{todo.title}</h2>
                        <FontAwesomeIcon icon={faCaretUp} />
                    </div>
                    <hr />
                    <p className="text-sm">{todo.description}</p>
                </div>
            ) : (
                <div className="flex flex-col hover:bg-neutral-400 p-2 rounded-lg gap-1 w-full transition justify-center">
                    <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <h2 className="text-lg">{todo.title}</h2>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                </div>
            )}
            <div className="flex gap-2 text-xl">
                {todo.isCompleted ? (
                    <button>
                        <FontAwesomeIcon
                            icon={faSquareCheck}
                            onClick={toggleIsCompleted}
                            className="text-green-500"
                        />
                    </button>
                ) : (
                    <button>
                        <FontAwesomeIcon
                            icon={faSquare}
                            onClick={toggleIsCompleted}
                        />
                    </button>
                )}
                <button>
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        className="text-red-600"
                    />
                </button>
            </div>
        </div>
    );
}
