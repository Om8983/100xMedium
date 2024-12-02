import { GOOGLE_AUTH_URL } from "../../config"

type Prop = {
    accType: "Login" | "SignUp";
}
export const GoogleBtn = ({ accType }: Prop) => {
    return (
        <button onClick={() => window.open(`${GOOGLE_AUTH_URL}`, "_self")} className="relative ">
            <div className="absolute bg-brad w-[200px] h-[2.4rem] p-2 blur-lg"></div>
            <div className="relative flex gap-2 bg-white w-full rounded-lg p-2 -inset-y-[0.38rem] items-center justify-center font-medium ">{
                accType === "Login" ? "Login With Google" : "Sign Up With Google"
            } <span><img src="/google.svg" alt="google" className="w-7 h-7" /></span> </div>

        </button>
    )
}
