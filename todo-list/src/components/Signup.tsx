"use client";

import { useState } from "react";

type SignupProps = {
    onSubmitSignup: () => void;
};

export default function Signup({ onSubmitSignup }: SignupProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== passwordConfirm)
            setError("Confirme sua senha corretamente");
        else {
            try {
                const response = await fetch(
                    "http://api-todo-estagio-production.up.railway.app:8080/user/signup",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    onSubmitSignup();
                } else {
                    setError("Usuário já existe");
                }
            } catch (error) {
                setError("Falha ao realizar cadastro");
                console.error(error);
            }
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-lg font-bold">Cadastro:</h1>
            <hr className="border-neutral-800" />
            <form className="flex flex-col gap-1" onSubmit={handleSubmitLogin}>
                <label>Email:</label>
                <input
                    className="p-1 rounded-lg border"
                    type="email"
                    value={email}
                    placeholder=""
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Senha:</label>
                <input
                    className="p-1 rounded-lg border"
                    type="password"
                    value={password}
                    placeholder=""
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Confirme a senha:</label>
                <input
                    className="p-1 rounded-lg border"
                    type="password"
                    value={passwordConfirm}
                    placeholder=""
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    className="border-2 border-blue-600 rounded-lg p-1 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                    type="submit"
                >
                    Cadastrar-se
                </button>
            </form>
        </div>
    );
}
