import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/authHook";
import { useEffect } from "react";
import { Wobble } from "../components/Loader/Wobble";

export const Protected = () => {
    const navigate = useNavigate();
    const { response, loading } = useAuth()  // custom hook for authentication

    useEffect(() => {
        if (loading === false) {
            if (response === true) {
                return navigate("/blog")
                
            } else {
                alert("Unauthorized User");
                navigate("/login")
                return
            }
        }
    }, [response, loading, navigate])

    if (loading === true) {
        return (
            <Wobble></Wobble>
        )
    }
}

