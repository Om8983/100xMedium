import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { userId, userLoginAtom, verifiedEmail } from "../store/atoms/userInfoAtom"
import { USERS_BACKEND_URL } from "../config"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { UnAuth } from "../components/UnAuth"
import { token } from "../store/atoms/otpAtoms"
import { useState } from "react"
import { userProfile } from "../store/atoms/userData"
import { UserProfileCard } from "../components/UserProfile/UserProfileCard"
import { Wobble } from "../components/Loader/Wobble"

export const UserProfile = () => {
    const setUserLogin = useSetRecoilState(userLoginAtom)
    const id = useRecoilValue(userId)
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
            // setUserID("")
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
            setBox(true)
            const res = await axios.get(`${USERS_BACKEND_URL}/getOtp`)
            if (res.status === 200) {
                const { OTP } = res.data;
                setOTP(OTP)
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 400) {
                    alert("Error While Sending OTP")
                    setBox(false)
                } else {
                    alert("Internal Server Error")
                    setBox(false)
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

    if (userData.state === "loading") {
        return <Wobble></Wobble>
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
