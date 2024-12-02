import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRecoilState } from "recoil";
import { Counter } from "./Counter";
import { USERS_BACKEND_URL } from "../../config";
import { token } from "../../store/atoms/otpAtoms";

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
                        <button className="bg-orange-200 rounded-md w-[7rem] min-h-6 p-1 text-center font-medium text-sm font-serif lg:text-base lg:mt-3 " onClick={resetTimer}>Resend OTP</button>
                    </div>
            }
        </>

    );
});

export default CountDown;