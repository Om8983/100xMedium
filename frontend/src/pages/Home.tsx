import { useNavigate } from "react-router-dom"
import { HomeImg } from "../components/HomeImg";
import { useRecoilValue } from "recoil";
import { userLoginAtom } from "../store/atoms/userInfoAtom";
import { useEffect } from "react";
import { NavLinks } from "../components/NavBar/NavLinks";
import { motion } from "motion/react";
export const Home = () => {
    const title = "Words That Matter!"
    const subtitle = "Space where thoughts take shape and stories find meaning."

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

    const parent = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }
    const children = {
        initial: { opacity: 0, y: 100 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.2,
                duration : 0.3
            }
        }
    }
    return (
        <>
            <NavLinks className="fixed" />
            {/* div of grid having 2 cols on large screen, one side text other side image */}
            <div className=" lg:grid lg:grid-cols-2 w-screen h-screen bg-[url('/paper.png')] md:bg-no-repeat md:bg-cover  ">
                {/* div containing contents  */}
                <motion.div
                    variants={parent}
                    initial="initial"
                    animate="animate"
                    className=" pt-[12rem] md:pt-[12rem] lg:pt-[14.5rem] ml-4 lg:ml-[8rem]"
                >
                    {/* the first h1 will be visible to screen-reader only "sr-only", but the other h1 won't be visible to screen-readers. While this is the opposite of how the user sees. The user would see the other h1 but won't be able to visit the first h1 */}
                    <h1 className="sr-only">{title}</h1>
                    <h1 aria-hidden className="text-7xl md:text-8xl font-[boy] font-bold ">
                        {title
                            .split("")
                            .map((letter,index) =>
                                <motion.span key={index} className={`inline-block ${letter === " " && "w-4"}`} variants={children} >
                                    {letter}
                                </motion.span>)
                        }
                    </h1>

                    <motion.p
                        variants={children}
                        className="text-gray-500 text-2xl font-[boy] ">
                        {subtitle}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, }}
                        transition={{ duration: 0.5, ease: "easeIn", delay: 3.6 }}
                        className=" pt-5 ">
                        <button
                            className="w-[170px] h-[40px] text-xl text-black bg-white bg-opacity-40 font-[boy] outline-none border-2 border-black rounded-2xl p-1 transition ease-in-out delay-100 hover:scale-110 hover:bg-black hover:text-white"
                            onClick={handleClick}>
                            Start Reading
                        </button>
                    </motion.div>
                </motion.div>
                {/* image on large screen */}
                <HomeImg />
            </div>
        </>
    )
}
