import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/authHook";
import { useEffect } from "react";


export const Protected = () => {
    const navigate = useNavigate();
  
    const { response } = useAuth()
    useEffect(() => {
        if (response === true) {
            navigate('/blog')
        } else {
            alert("Unauthorized User");
            navigate('/login')
        }
    }, [response, navigate])

    return (
        <div>Loading animation</div>
    )
}

