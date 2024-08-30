import Todo from "@/components/Todo.";

export default function Home() {
    return (
        <main className="h-screen flex items-center justify-center bg-stone-800 text-white">
            <div className="flex flex-col gap-2 bg-stone-500 min-w-80 rounded-lg p-5 min-w-96">
                <h1 className="text-xl">Minhas tarefas</h1>
                <hr />
                <Todo id={0} title="Correr" description="correr muito"/>
                <Todo id={0} title="Jantar" description="jantar muito"/>
                <Todo id={0} title="Dormir" description="dormir muito"/>
            </div>
        </main>
    );
}
