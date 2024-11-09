import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { InputBox } from "../../components/InputBox"
import { Testimonial } from "../../components/Testimonial"
import axios, { AxiosError } from "axios"
import { SignUpSchema } from "@om_wadhi/common"
import { useState } from "react"
import { USERS_BACKEND_URL } from "../../config"
import { useSetRecoilState } from "recoil"
import { UserInfo } from "../../store/atoms/userInfoAtom"
import { GoogleBtn } from "../../components/GoogleBtn"
export const Signup = () => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, SetPass] = useState<string>("")
    const sestUserInfo = useSetRecoilState(UserInfo)

    const navigate = useNavigate();
    //login redirect
    const RedirectLogin = () => {
        navigate('/login')
    }
    // sending backend request
    const handleSignup = async () => {
        let newUser: SignUpSchema = {
            username, email, password
        }
        try {
            const response = await axios.post(`${USERS_BACKEND_URL}/signup`, newUser, { withCredentials: true })
            if (response.status === 200) {
                const { user } = response.data
                alert("User SignUp Successfull!!")
                sestUserInfo({ userId: user.id, username: user.username, email: user.email })
                navigate("/protected")
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 403) {
                    alert("Invalid Information! Please try again.")
                    navigate("/signup")
                } else if (e.response?.status === 409) {
                    alert("User Already exist! Please Login")
                    navigate("/login")
                }
            }
        }
    }
    return (
        <>
            <div className=" grid lg:grid-cols-2 h-screen gap-6 bg-[#011e2b] ">
                <div className="flex flex-col justify-center items-center gap-3">
                    <div className="flex flex-col gap-2 mb-7">
                        <h1 className="text-center font-semibold text-4xl font-[myfont] text-white  ">Create An Account</h1>
                        <p className="text-center text-gray-500 inline-block">Already have an account ?<span className=" pl-2 cursor-pointer text-gray-500 underline " onClick={() => RedirectLogin()} >Login
                            <img src="redirect.svg" alt="redirect btn" className="inline-block w-4 h-4 ml-1 pb-[2px]" />
                        </span> </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-gray-500">Username</label>
                            <InputBox type="text" setValue={setUsername} id="username" placeholder="Enter Your Username"></InputBox>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-gray-500">Email</label>
                            <InputBox type="email" setValue={setEmail} id="email" placeholder="example@gmail.com"></InputBox>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-500">Password</label>
                            <InputBox type="password" setValue={SetPass} id="password" placeholder="********"></InputBox>
                        </div>
                    </div>

                    <Button onclick={handleSignup} className="mt-4" text="Sign Up"></Button>
                    <div className="flex flex-col gap-8 mt-3">
                        <div className="flex items-center">
                            <span className="w-20 h-[0.05rem] bg-white " />
                            <span className=" text-sm px-4 text-white "> OR</span>
                            <span className="w-20 h-[0.05rem] bg-white " />
                        </div>
                        <div>
                            <GoogleBtn accType="SignUp"/>
                        </div>
                    </div>
                </div>
                <Testimonial className="hidden lg:block " ></Testimonial>
            </div>
        </>
    )
}
