import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Dropdown } from "./Dropdown"
import { DropdownOpt } from "./dropdownOpt"
import axios, { AxiosError } from "axios"
import { useRecoilState } from "recoil"
import { USERS_BACKEND_URL } from "../config"
import { userLoginAtom } from "../store/atoms/userInfoAtom"
import { SearchBar } from "./SearchBar"

// import { Dropdown } from "./Dropdown"
type Prop = {
    className?: string
}
export const NavLinks = ({ className }: Prop) => {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useRecoilState(userLoginAtom)
    const [drop, setDrop] = useState(false)
    // defining window.scrollY directly won't affect in the className. It is a dynamic event so you have to use useEffect() to track the changes 
    const [scroll, setScroll] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [scroll])

    // dropdown navigation 
    const handleNavigation = () => {
        setDrop(true)
    }
    // close dropdown
    const handleclick = () => {
        setDrop(false)
    }

    // user profile redirect from dropdown opt
    const userProfile = () => {
        navigate("/userProfile")
    }

    // logout
    const handleLogout = async () => {
        try {
            await axios.post(`${USERS_BACKEND_URL}/logout`, {}, { withCredentials: true })
            // setUserID("")
            setUserLogin(false)
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
    return (
        <>
            {scroll && <div className="h-[60px]"> </div>}
            <div className={` ${scroll ? "fixed  backdrop-blur-lg" : "static"} top-0 left-0 w-full h-[60px] border-b-[0.5px] border-black z-50 ${className} `}>
                <ul className="flex justify-around items-center ">
                    {/* logo */}
                    <div className="flex justify-center items-center">
                        <li>
                            <a href="/" className="border-none outline-none  ">
                                <img src="/logo.svg" alt="logo" className=" w-[120px] border-none outline-none " />
                            </a>
                        </li>
                    </div>
                    {/* search Bar */}
                    {/* supposed to be rendered only on /blog page */}
                    {window.location.pathname === "/blog" &&
                        <div className="relative">
                            <SearchBar />
                        </div>
                    }

                    {
                        userLogin ?
                            // user is logged in represent his image and on click show dropdown with logout button & profile button  
                            <li>
                                <Dropdown onClick={handleNavigation} />
                                <div >
                                    <div className={` ${drop ? "transition transform duration-150 ease-in-out scale-100 " : " opacity-0 scale-0"} absolute w-screen h-screen bg-transparent backdrop-blur-lg  right-0 top-0  `} >
                                        <button className="absolute top-6 right-6 w-8 h-8 transition-transform hover:scale-110" onClick={handleclick}> <img src="/dropclose.svg" alt="closesvg" /></button>

                                        <div className="flex flex-col gap-3 justify-center items-center h-screen">
                                            <DropdownOpt onclick={() => userProfile()} text="User Profile" svg="/user.svg" />
                                            <DropdownOpt onclick={() => navigate("/myblogs")} text="My Blogs" svg="/blog.svg" />
                                            <DropdownOpt onclick={handleLogout} text="Log Out" svg="/logout.svg" />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            :
                            <>
                                {/* signup */}
                                <div className="flex gap-5 pt-3">
                                    <li>
                                        <Link className="block text-center w-[80px] bg-white bg-opacity-40 text-black rounded-xl p-1 font-semibold outline-none transition ease-in-out delay-100 hover:scale-105 hover:bg-black hover:text-white border-2 border-black" to={"/signup"}>SignUp</Link>
                                    </li>
                                    {/* signin */}
                                    <li>
                                        <Link className=" block w-[80px] text-center p-1 bg-white bg-opacity-40 text-black rounded-xl font-semibold outline-none transition ease-in-out delay-100 hover:scale-105 hover:bg-black hover:text-white border-2 border-black " to={"/login"}>Log In</Link>
                                    </li>
                                </div>
                            </>
                    }
                </ul >
            </div >
        </>
    )
}

