import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { USERS_BACKEND_URL } from "../config";
import {  useSetRecoilState } from "recoil";
import { userId, userLoginAtom } from "../store/atoms/userInfoAtom";
import { verifiedEmail } from "../store/atoms/userInfoAtom";

export const useAuth = () => {
    const [response, setResponse] = useState<Boolean>(false)
    const [loading, setLoading] = useState<Boolean>(true)
    const setUserID  = useSetRecoilState(userId)
    const setVerify = useSetRecoilState(verifiedEmail)
    const setUserLogin = useSetRecoilState(userLoginAtom)
    useEffect(() => {
        (async () => {
            try {
                
                let res = await axios.get(`${USERS_BACKEND_URL}/authCheck`,{withCredentials : true})
                
                if (res.status == 200) {
                    const { id, verified }  = res.data.user;
                    setResponse(true)  // by default false
                    setUserID(id)
                    setVerify(verified)
                    setUserLogin(true) // by default false
                    setLoading(false)  // by default true
                }
            } catch (e) {
                if (e instanceof AxiosError) {

                    if (e.response?.status === 401) {
                        alert("unauthorized user")
                        setResponse(false)
                    } else {
                        alert("Internal server error")
                        setResponse(false)
                    }
                }
            }
        })()
        return () => { }
    }, [])
    return {response, loading} ;
}
