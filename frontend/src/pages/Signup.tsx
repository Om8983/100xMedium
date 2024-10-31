import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import { Testimonial } from "../components/Testimonial"
import axios, { AxiosError } from "axios"
import { SignUpSchema } from "@om_wadhi/common"
import { useState } from "react"
export const Signup = () => {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, SetPass] = useState<string>("")

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
            const response = await axios.post(" https://backend-medium.lostboybegining.workers.dev/api/v1/users/signup", newUser, { withCredentials: true })
            if (response.status === 200) {
                alert("User SignUp Successfull!!")
                navigate("/")
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
            <div className="grid lg:grid-cols-2 h-screen gap-6 ">
                <div className="flex flex-col justify-center items-center gap-3 ">
                    <div className="flex flex-col gap-2 mb-7">
                        <h1 className="text-center font-semibold text-4xl font-[myfont] ">Create An Account</h1>
                        <p className="text-center text-gray-600 inline-block">Already have an account ?<span className=" pl-2 cursor-pointer text-gray-600 underline " onClick={() => RedirectLogin()} >Login
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
                </div>
                <Testimonial ></Testimonial>
            </div>
        </>
    )
}
