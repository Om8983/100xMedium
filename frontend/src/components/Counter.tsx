import { Dispatch, useEffect, useState } from "react"

type Prop = {
    seconds: number
    setValue : Dispatch<React.SetStateAction<boolean>>
}
export const Counter = ({ seconds, setValue }: Prop) => {
    const [min, setMin] = useState(Math.floor(seconds / 60))
    const [sec, setSec] = useState(seconds % 60)
    useEffect(() => {
        const timer = setInterval(() => {
            setSec((prevSec) => {
                if (prevSec === 0) {
                    if (min === 0) {
                        setValue(true)
                        clearInterval(timer);
                        return 0;
                    } else {
                        setMin((prevMin) => prevMin - 1);
                        return 59;
                    }
                } else {
                    return prevSec - 1;
                }
            });
        }, 1000);
    return () => { clearInterval(timer) }
}, [seconds, min])

return (
    <>
        <div className=" flex gap-2 bottom-0 self-center">
            <label htmlFor="otp" className=" text-sm font-serif "> Resend OTP in </label>
            <div className="text-sm font-sans">
                {
                    `${`0` + min}:${sec < 10 ? `0` + sec : sec}`
                }
            </div>
        </div>
    </>
)
}
