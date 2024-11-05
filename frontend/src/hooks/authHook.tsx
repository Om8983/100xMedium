import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USERS_BACKEND_URL } from "../config";

export const useAuth = () => {
    const [response, setResponse] = useState<boolean>()
    const [authLoad, setLoading] = useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            try {
                let res = await axios.get(`${USERS_BACKEND_URL}/authCheck`, { withCredentials: true })
                if (res.status == 200) {
                    setResponse(true)
                    setLoading(false)
                }
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.status === 401) {
                        setResponse(false)
                    } else {
                        setResponse(false)
                    }
                }
            }
        })()
        return () => { }
    }, [navigate])
    return { response, authLoad }
}
