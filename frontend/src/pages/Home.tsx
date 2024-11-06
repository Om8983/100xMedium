import { useNavigate } from "react-router-dom"
import { NavLinks } from "../components/NavLinks"
import { HomeImg } from "../components/HomeImg";
import { useAuth } from "../hooks/authHook";
import { useEffect } from "react";
export const Home = () => {
    const navigate = useNavigate();
    const { response } = useAuth();
    
    useEffect(() => {
        if (response === true) {
            navigate('/blog')
        }
    }, [navigate, response])

    
    const handleClick = () => {
        navigate('/login')
    }
    
    return (
        <>
            <NavLinks response={response} className="fixed" />
            {/* div of grid having 2 cols on large screen, one side text other side image */}
            <div className=" lg:grid lg:grid-cols-2 w-screen h-screen bg-[url('/paper.png')] md:bg-no-repeat md:bg-cover  ">
                {/* div containing contents  */}
                <div className=" pt-[12rem] md:pt-[12rem] lg:pt-[14.5rem] ml-4 lg:ml-[8rem] ">
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
