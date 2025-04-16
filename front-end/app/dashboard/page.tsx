"use client"

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie";

interface DecodedToken {
    name: string;
    email: string;
    role: string;
}

export default function Dashboard() {
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        const token = Cookies.get("token");

        if(!token){
            return;
        }

        const decodedToken: DecodedToken = jwtDecode(token);

        setRole(decodedToken.role);
    }, []);
    
    return (
        <>
            <h1>Dashboard - {role}</h1>
        </>
    )
}