import Login from "@/components/Login";

export default function LoginView() {
    return (
        <main className="h-screen flex items-center justify-center bg-neutral-800">
            <div className="flex flex-col gap-2 bg-neutral-100 rounded-3xl p-5 w-[30rem]">
                <Login />
            </div>
        </main>
    );
}
