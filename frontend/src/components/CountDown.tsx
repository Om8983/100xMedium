import { useState } from "react";
import { Counter } from "./Counter";
import axios, { AxiosError } from "axios";
import { USERS_BACKEND_URL } from "../config";
import { useRecoilState } from "recoil";
import { token } from "../store/atoms/otpAtoms";
const CountDown = (() => {
    const [isOver, setOver] = useState<boolean>(false)
    const [otp, setOTP] = useRecoilState(token)
    const resetTimer = async () => {
        try {
            const res = await axios.get(`${USERS_BACKEND_URL}/getOtp`)
            if (res.status === 200) {
                const { OTP } = res.data;
                setOTP(OTP)
                setOver(false)
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

    return (
        <>
            {
                isOver === false ?
                    <Counter setValue={setOver} seconds={119} />
                    :
                    <div className=''>
                        <button className="bg-green-600 rounded-lg text-white w-24 h-6 font-medium text-xs p-1" onClick={resetTimer}>Resend OTP</button>
                    </div>
            }
        </>

    );
});

export default CountDown;