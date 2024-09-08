"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                router.push("/todo-list");
            } else {
                setError("Email ou senha inválidos");
            }
        } catch (error) {
            setError("Falha ao realizar login");
        }

        //teste
        router.push("/todo-list");
    };

    return (
        <div>
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
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    className="border-2 border-green-400 rounded-lg p-1 text-green-400 hover:bg-green-400 hover:text-white transition"
                    type="submit"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
