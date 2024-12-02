import { useNavigate } from "react-router-dom"
import { HomeImg } from "../components/HomeImg";
import { useRecoilValue } from "recoil";
import { userLoginAtom } from "../store/atoms/userInfoAtom";
import { useEffect } from "react";
import { NavLinks } from "../components/NavBar/NavLinks";
export const Home = () => {
    const navigate = useNavigate();
    // since i will store the respose from useAuth() in the recoil atom i will directly use the atom value here for validation rather defining a new useAuth()

    const userLogin = useRecoilValue(userLoginAtom)

    useEffect(() => {
        if (userLogin === true) {
            navigate("/protected")
        }
    }, [userLogin, navigate])

    const handleClick = () => {
        navigate('/login')
    }

    return (
        <>
            <NavLinks className="fixed" />
            {/* div of grid having 2 cols on large screen, one side text other side image */}
            <div className=" lg:grid lg:grid-cols-2 w-screen h-screen bg-[url('/paper.png')] md:bg-no-repeat md:bg-cover  ">
                {/* div containing contents  */}
                <div className=" pt-[12rem] md:pt-[12rem] lg:pt-[14.5rem] ml-4 lg:ml-[8rem]">
                    <h1 className="text-7xl md:text-8xl font-[boy] font-bold  ">Words That Matter!</h1>
                    <p className="text-gray-500 text-2xl font-[boy] ">Space where thoughts take shape and stories find meaning </p>
                    <div className=" pt-5 ">
                        <button className="w-[170px] h-[40px] text-xl text-black bg-white bg-opacity-40 font-[boy] outline-none border-2 border-black rounded-2xl p-1 transition ease-in-out delay-100 hover:scale-110 hover:bg-black hover:text-white" onClick={handleClick}>Start Reading</button>
                    </div>
                </div>
                {/* image on large screen */}
                <HomeImg />
            </div>
        </>
    )
}
