import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { InputBox } from "../../components/InputBox"
import { Testimonial } from "../../components/Testimonial"
import axios, { AxiosError } from "axios"
import { LoginSchema } from "@om_wadhi/common"
import { useState } from "react"
import { USERS_BACKEND_URL } from "../../config"

export const Login = () => {

  const [email, setEmail] = useState<string>("")
  const [password, SetPass] = useState<string>("")

  const navigate = useNavigate();
  const RedirectLogin = () => {
    navigate('/signup')
  }
  const handleSignup = async () => {
    let newUser: LoginSchema = {
      email, password
    }
    try {
      const response = await axios.post(`${USERS_BACKEND_URL}/login`, newUser, { withCredentials: true })
      if (response.status === 200) {
        alert("Login Successfull!")
        navigate("/blog")
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 403) {
          alert("Invalid Input! Please Try Again")
          navigate("/login")
        } else if (e.response?.status === 401) {
          alert("Incorrect Password")
          navigate('/login')
        } else if (e.response?.status === 409) {
          alert("No User Found! Please Signup")
          navigate("/signup")
        }
      } else {
        alert("Internal Server Error")
        navigate('/login')
      }
    }
  }
  return (
    <>
      <div className="grid lg:grid-cols-2 h-screen gap-6 ">
        <div className="flex flex-col justify-center items-center gap-3 ">
          <div className="flex flex-col gap-2 mb-7">
            <h1 className="text-center font-semibold text-4xl font-[myfont] ">Login To Your Account</h1>
            <p className="text-center text-gray-600 inline-block">Don't have an account ?<span className=" pl-2 cursor-pointer text-gray-600  underline " onClick={() => RedirectLogin()} >Sign Up
              <img src="redirect.svg" alt="redirect btn" className="inline-block w-4 h-4 ml-1 pb-[2px]" />
            </span> </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-500">Email</label>
              <InputBox type="email" setValue={setEmail} id="email" placeholder="example@gmail.com"></InputBox>

            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-500">Password</label>
              <InputBox type="password" setValue={SetPass} id="password" placeholder="********"></InputBox>
            </div>
          </div>

          <Button onclick={handleSignup} className="mt-4" text="Login"></Button>
        </div>
        <Testimonial ></Testimonial>
      </div>
    </>
  )
}
