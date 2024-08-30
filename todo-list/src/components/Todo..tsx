"use client"

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

type TodoProps = {
    id: number,
    title: string,
    description: string
}

export default function Todo({ id, title, description }: TodoProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {
                isOpen ? 
                    <div className="flex flex-col bg-stone-600 p-2 rounded-lg gap-1">
                        <div className="flex justify-between items-center cursor-pointer"
                        onClick={toggleDropdown}
                        >
                            <h2 className="text-lg">{title}</h2>
                            <FontAwesomeIcon icon={faCaretUp} />
                        </div>
                        <hr />
                        <p className="text-sm">{description}</p>
                    </div>
                    :
                    <div className="flex flex-col hover:bg-stone-600 p-2 rounded-lg gap-1">
                        <div className="flex justify-between items-center cursor-pointer"
                        onClick={toggleDropdown}
                        >
                            <h2 className="text-lg">{title}</h2>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>
            }
        </>
    );
}