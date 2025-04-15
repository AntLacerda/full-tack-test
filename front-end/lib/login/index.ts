export async function login(email: string, password: string) {
    try {
        const response = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.message || "Um erro inesperado aconteceu, tente novamente mais tarde!");
        }

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Um erro inesperado aconteceu, tente novamente mais tarde!");
    }
}