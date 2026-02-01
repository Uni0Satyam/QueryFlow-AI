import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpStatus from 'http-status';
import servers from "../environment";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState(authContext);
    const router = useNavigate();

    const handleSignup = async (formData) => {
        try {
            const res = await fetch(`${servers.prod}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.status === httpStatus.CREATED) {
                return data.message;
            } else{
                throw data.message;
            }
        } catch (error) {
            throw error;
        }
    }

    const handleLogin = async (formData) => {
        try {
            const res = await fetch(`${servers.prod}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.status === httpStatus.OK) {
                localStorage.setItem("token", data.token);
                router("/home");
            } else{
                throw data.message;
            }
        } catch (error) {
            throw error;
        }
    }

    const handleLogout = async () => {
        localStorage.removeItem("token");
        router("/auth", { replace: true });
    }

    const data = {
        userData, setUserData, handleSignup, handleLogin, handleLogout
    }

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )

}
