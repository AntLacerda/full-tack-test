import Cookies from "js-cookie";

export async function createCourt(name: string, location: string, available: boolean) {
    try {
        const response = await fetch("http://localhost:3001/api/v1/courts/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            },
            body: JSON.stringify({ name, location, available })
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

export async function findCourtById(id: string) {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/courts/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Um erro inesperado aconteceu, tente novamente mais tarde!")
        }

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Um erro inesperado aconteceu, tente novamente mais tarde!")
    }
}

export async function editCourt(id: string, name: string, location: string, available: boolean) {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/courts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify({ name, location, available }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Um erro inesperado aconteceu, tente novamente mais tarde!")
        }

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Um erro inesperado aconteceu, tente novamente mais tarde!")
    }
}

export async function removeCourt(id: string) {
    try {
        const response = await fetch(`http://localhost:3001/api/v1/courts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get("token")}`
            }
        });
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Um erro inesperado aconteceu, tente novamente mais tarde!")
        }

        return data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Um erro inesperado aconteceu, tente novamente mais tarde!")
    }
}
