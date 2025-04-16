import Cookies from "js-cookie";

export async function findAllCourts() {
    try {
        const response = await fetch("http://localhost:3001/api/v1/courts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`,
            },
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