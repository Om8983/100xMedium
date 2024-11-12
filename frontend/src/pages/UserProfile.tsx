import { useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { UserProfileCard } from "../components/UserProfileCard"
import { userId, userLoginAtom } from "../store/atoms/userInfoAtom"
import { USERS_BACKEND_URL } from "../config"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { UnAuth } from "../components/UnAuth"
import { token, verifiedEmail } from "../store/atoms/otpAtoms"
import { useState } from "react"
import { userProfile } from "../store/atoms/userData"

export const UserProfile = () => {
    const setUserLogin = useSetRecoilState(userLoginAtom)
    const [id, setUserID] = useRecoilState(userId)
    const userData = useRecoilValueLoadable(userProfile(id))
    const navigate = useNavigate();

    // for verification
    const [otp, setOTP] = useRecoilState(token)  //token sent to email 
    const [inputBox, setBox] = useState<Boolean>(false)

    //verified atom
    const setVerify = useSetRecoilState(verifiedEmail)

    // logout
    const handleLogout = async () => {
        try {
            await axios.post(`${USERS_BACKEND_URL}/logout`, {}, { withCredentials: true })
            setUserLogin(false)
            setUserID("")
            setVerify(false)
            alert("User LogOut Success!!")
            navigate("/")
            return;
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 500) {
                    navigate("/")
                    return;
                }
            }
        }
    }

    const sendOtp = async () => {
        try {
            const res = await axios.get(`${USERS_BACKEND_URL}/getOtp`)
            if (res.status === 200) {
                const { OTP } = res.data;
                setOTP(OTP)
                setBox(true)
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 400) {
                    alert("Error While Sending OTP")
                } else {
                    alert("Internal Server Error")
                }
            }
        }
    }

    const verifyOtp = async () => {
        try {
            const res = await axios.get(`${USERS_BACKEND_URL}/verifyOtp?OTP=${otp}&id=${id}`);
            if (res.status === 200) {
                setVerify(true)
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 401) {
                    alert("Invalid OTP")
                } else {
                    alert("Internal Server Error")
                }
            }
        }
    }

    // setting verification status received from backend 
    // if (userData.state === "hasValue") {
    //     const { user } = userData.contents
    //     setVerify(user.verified)
    // }

    if (userData.state === "loading") {
        return <p>loading,...</p>
    } else if (userData.state === "hasError") {
        alert("internal server issue ")
    } if (userData.state === "hasValue") {
        if (userData.contents === undefined) {
            return <UnAuth />
        } else {
            const { user } = userData.contents
            return < UserProfileCard
                onClickLogout={handleLogout}
                username={user.username ?? ""}
                email={user.email ?? ""}
                onClickSendOtp={sendOtp}
                //for input otp
                box={inputBox}
                onClickVerify={verifyOtp}
            />
        }
    }
}
