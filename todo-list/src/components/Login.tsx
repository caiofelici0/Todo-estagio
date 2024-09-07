"use client";

import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmitLogin = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div>
            <form className="flex flex-col gap-1" onSubmit={handleSubmitLogin}>
                <label>email:</label>
                <input
                    className="p-1 rounded-lg border"
                    type="email"
                    value={email}
                    placeholder=""
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>senha:</label>
                <input
                    className="p-1 rounded-lg border"
                    type="password"
                    value={password}
                    placeholder=""
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
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
