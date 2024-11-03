import { Link } from "react-router-dom"

export const NavLinks = () => {

    return (
        <div className=" fixed w-full h-[60px] border-b-[0.5px] border-black ">
            <ul className="flex justify-around items-center ">
                {/* logo */}
                <div className="flex justify-center items-center">
                    <li>
                        <a href="/" className="border-none outline-none  ">
                            <img src="logo.svg" alt="logo" className=" w-[120px] border-none outline-none " />
                        </a>
                    </li>
                    {/* search Bar */}
                    {/* supposed to be rendered only on /blog page */}
                    {window.location.pathname === "/blog" &&
                        <li>
                            <input type="search" className=" w-[100px] bg-gray-100 shadow-md rounded-xl" />
                        </li>}
                    
                </div>
                {/* signup */}
                <div className="flex gap-10 pt-3">
                    <li>
                        <Link className="block text-center w-[80px] bg-white bg-opacity-40 text-black rounded-xl p-1 font-semibold outline-none transition ease-in-out delay-100 hover:scale-105 hover:bg-black hover:text-white border-2 border-black" to={"/signup"}>SignUp</Link>
                    </li>
                    {/* signin */}
                    <li>
                        <Link className=" block w-[80px] text-center p-1 bg-white bg-opacity-40 text-black rounded-xl font-semibold outline-none transition ease-in-out delay-100 hover:scale-105 hover:bg-black hover:text-white border-2 border-black " to={"/login"}>Log In</Link>
                    </li>
                </div>
            </ul>
        </div>
    )
}
