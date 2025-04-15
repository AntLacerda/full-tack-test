export default async function signup(name: string, email: string, password: string, adminAccount: boolean) {
    try {
        const response = await fetch(`${adminAccount ? "http://localhost:3001/api/v1/users/save" : "http://localhost:3001/auth/signup"}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Um erro inesperado aconteceu, tente novamente mais tarde!");
        }

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Um erro inesperado aconteceu, tente novamente mais tarde!");
    }
}