import Cookies from "js-cookie";

export async function logout() {
    Cookies.remove("token");
    window.location.href = "/login";
}