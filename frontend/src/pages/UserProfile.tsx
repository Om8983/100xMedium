import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useResetRecoilState, useSetRecoilState } from "recoil"
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
    const resetVerify = useResetRecoilState(verifiedEmail)
    const resetUserId = useResetRecoilState(userId)
    const resetLogin = useResetRecoilState(userLoginAtom)

    // for verification
    const [otp, setOTP] = useRecoilState(token)  //token sent to email 
    const [inputBox, setBox] = useState<boolean>(false)

    //verified atom
    const setVerify = useSetRecoilState(verifiedEmail)
    // logout
    const handleLogout = async () => {
        try {
            await axios.post(`${USERS_BACKEND_URL}/logout`, {}, { withCredentials: true })
            setUserLogin(false)
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

        if (userData.contents === null || userData.contents.errorStatus === 500) {
            return (
                <>
                    <div className="flex flex-col gap-2 h-screen justify-center items-center bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover">
                        <p className="text-2xl font-semibold rounded-md font-serif">Unable to fetch User Data.</p>
                        <p className="text-2xl font-semibold rounded-md font-serif">If the error continues try re-login</p>
                        <button onClick={() => navigate("/login")} className="bg-white font-serif p-2 rounded-md hover:text-white hover:bg-[#011e2b] ring-1 ring-black transition-transform ease-in-out hover:scale-110  "> Re-Login </button>
                    </div>
                </>
            )
        }
        // if i define this on top then it would've caused issues since at first occurence status would be 401 but since localstorage is cleared then the request going to backend would include no userId and hence the data received will have user === null and hence the above xml is supposed to rendered.
        if (userData.state === "hasValue" && userData.contents.errorStatus === 401) {
            resetUserId();
            resetVerify();
            resetLogin();
            return <UnAuth></UnAuth>
        }
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
