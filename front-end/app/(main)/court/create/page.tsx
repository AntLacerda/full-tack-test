import CreateCourtForm from "@/components/dashboard/create-court-form";

export default function CreateCourt() {
    return (
        <main className="w-full flex flex-col p-6">
            <div>
                <h1 className="text-5xl font-bold mb-3">Criar Quadra</h1>
                <p>Preencha os dados necessários para criar uma nova quadra!</p>
            </div>
            <div className="w-full flex justify-center items-center mt-4">
                <CreateCourtForm/>
            </div>
        </main>
    );
}