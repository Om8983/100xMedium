import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/authHook";
import { useEffect } from "react";

export const Protected =   () => {
    const navigate = useNavigate();
    const {response, loading} =  useAuth()  // custom hook for authentication

    useEffect(() => {
        if(loading === false){
            if (response === true) {
                navigate("/blog")
            } else {
                alert("Unauthorized User");
                navigate("/login")
            }
        }
    }, [ response, navigate])

    if (loading === true) {
        return (
            <div>Loading animation</div>
        )
    }
}

