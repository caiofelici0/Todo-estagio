import Login from "@/components/Login";

export default function LoginPage() {
    return (
        <main className="h-screen flex items-center justify-center bg-neutral-800">
            <div className="flex flex-col gap-2 bg-neutral-100 rounded-3xl p-5 w-[30rem]">
                <h1 className="text-xl font-bold">Minhas tarefas</h1>
                <hr className="border-neutral-800" />
                <Login />
            </div>
        </main>
    );
}
