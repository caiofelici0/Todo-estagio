"use client";

import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { useState } from "react";

export default function LoginPage() {
    const [isSignuping, setIsSignuping] = useState<boolean>(false);
    const [signupCompleted, setSignupCompleted] = useState<boolean>(false);

    const handleSignup = () => {
        setIsSignuping(true);
    };

    const handleSignupCompleted = () => {
        setIsSignuping(false);
        setSignupCompleted(true);
    };

    return (
        <main className="h-screen flex items-center justify-center bg-neutral-800">
            <div className="flex bg-neutral-100 rounded-3xl divide-x">
                <div
                    className={`flex flex-col gap-2 bg-neutral-100 p-5 w-[30rem] ${
                        isSignuping ? "rounded-l-3xl" : "rounded-3xl"
                    }`}
                >
                    <h1 className="text-xl font-bold">Minhas tarefas</h1>
                    <hr className="border-neutral-800" />
                    <Login />
                    <div className="w-full flex justify-center gap-1 text-sm">
                        {signupCompleted ? (
                            <span>Cadastro concluído!</span>
                        ) : (
                            <>
                                <span>Ainda não tem cadastro?</span>
                                <button
                                    className="text-blue-600"
                                    onClick={handleSignup}
                                >
                                    Cadastrar-se
                                </button>
                            </>
                        )}
                    </div>
                </div>
                {isSignuping && (
                    <div className="flex flex-col gap-2 bg-neutral-100 rounded-r-3xl p-5 w-[30rem]">
                        <Signup onSubmitSignup={handleSignupCompleted} />
                    </div>
                )}
            </div>
        </main>
    );
}
