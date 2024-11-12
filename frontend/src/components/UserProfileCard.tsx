
import { useNavigate } from "react-router-dom"
import CountDown from "./CountDown"
import { useRecoilValue } from "recoil"
import { verifiedEmail } from "../store/atoms/otpAtoms"

type Props = {
    username: string
    email: string
    onClickLogout: () => void
    onClickSendOtp: () => void
    box: Boolean
    onClickVerify: () => void
}
export const UserProfileCard = ({ username, email, onClickLogout, onClickSendOtp, box, onClickVerify }: Props) => {
    const navigate = useNavigate();
    const verified = useRecoilValue(verifiedEmail);
    return (
        // 0f4c68
        <div className="bg-[#011e2b] h-screen w-screen flex items-center justify-center">

            <div className="absolute rounded-lg bg-brad w-[20rem] h-[36rem] md:w-[30rem] blur-xl  "></div>

            <div className='relative flex '>

                <div className="relative flex flex-col  w-[20rem] h-[36rem] md:w-[30rem] bg-[#0f4c68] rounded-lg shadow-2xl">
                    <div className="relative flex justify-center items-center h-[150px] w-full border-b-2 border-white">

                        <span className="absolute w-[6rem] h-[6rem] bg-brad rounded-full blur-xl "></span>
                        {/* need to add a small edit icon to update the image and send to backend */}
                        <img src="/user.svg" className=" relative rounded-full ring-1 bg-gray-300 ring-white w-[6rem] h-[6rem] " alt="usersvg" />

                    </div>
                    <div className="flex justify-between m-3 pt-4 md:justify-evenly ">
                        {/* 3 options edit profile, blogs, saved blogs */}
                        <div className="bg-white tracking-wide text-xs ring-1 border-none outline-none ring-white rounded-md font-bold p-1 w-20 h-6 text-center font-sans ">Edit Profile</div>
                        <div className="bg-white tracking-wide text-xs ring-1 border-none outline-none ring-white rounded-md font-bold p-1 w-20 h-6 text-center font-sans">Blogs</div>
                        <div className="bg-white tracking-wide text-xs ring-1 border-none outline-none ring-white rounded-md font-bold p-1 w-20 h-6 text-center font-sans">Saved</div>
                    </div>
                    <div className="flex flex-col gap-5 m-3 pt-6">
                        <form className="flex flex-col gap-5">
                            {/* username */}
                            <div className="flex flex-col ">
                                <label htmlFor="usernameBox" className="text-white font-sans text-sm font-bold pb-1 md:w-[20rem] md:self-center tracking-wider">Username</label>
                                <input id="usernameBox" className="w-full h-7 md:w-[20rem] md:self-center bg-white rounded-md font-medium text-center " value={username} disabled />
                            </div>
                            <div className="relative flex flex-col gap-3 ">
                                {/* user email */}
                                <div className="relative flex flex-col">
                                    <label htmlFor="emailInput" className="text-white md:w-[20rem] md:self-center font-sans text-sm font-bold pb-1 tracking-wider ">Email</label>
                                    <input id="emailInput" className="w-full h-7 md:w-[20rem] bg-white rounded-md text-center md:self-center font-medium" value={email} disabled />
                                </div>
                            </div>
                        </form>
                        {/* email verify button */}
                        {
                            !box && verified === false &&
                            <div className="relative flex justify-center ">
                                <span className="absolute bg-brad w-[3.3rem] h-[1.9rem] blur-lg "></span>
                                <button className="relative text-white text-sm rounded-md bg-green-500 font-medium w-[3.4rem] h-[1.9rem] text-center
                            p-1" onClick={onClickSendOtp} >Verify</button>
                            </div>

                        }
                        {
                            verified === true &&
                            <div className="relative flex justify-center ">
                                <span className="absolute bg-brad w-[5rem] h-[1.9rem] blur-lg "></span>
                                <button className="relative text-gray-200 text-sm rounded-md bg-green-700 font-medium w-[5rem] h-[1.9rem] text-centerp-1" onClick={onClickSendOtp} disabled >Verified &#10003; </button>
                            </div>
                        }


                        {/* input box with verify end */}
                        {
                            box && verified === false &&
                            <>
                                <div className="flex flex-col md:gap-5 ">
                                    <div className="flex justify-center">
                                        <div className="flex flex-col gap-1  ">
                                            <p className="text-xs text-gray-300 md:self-start">Check Your Email For OTP</p>
                                            <div className="flex gap-3 justify-between md:justify-center">
                                                <input id="otpInputBox" type="text" className="outline-none w-[12rem] placeholder:text-center placeholder:text-sm text-sm text-center rounded-md p-1  " placeholder="Enter OTP" />
                                                <button className="relative text-white text-sm rounded-md bg-green-500 font-medium w-[4rem] h-[1.9rem] text-center p-1" onClick={onClickVerify} >Verify</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="self-center">
                                        <CountDown />
                                    </div>
                                </div>
                            </>
                        }
                        <div className="flex justify-around w-full ">
                            {/* home */}
                            <button className="flex  justify-center  items-center space-x-2 mt-2" onClick={() => navigate("/protected")}>
                                <div className="text-white font-medium">Home </div>
                                <span ><img className="w-5 h-5" src="/home.svg" alt="logout" /></span>
                            </button>
                            {/* logout */}
                            <div className="flex  justify-center  items-center space-x-2 mt-2" >
                                <button onClick={onClickLogout} className="text-white font-medium ">Log Out </button>
                                <span ><img className="w-5 h-5" src="/logout.svg" alt="logout" /></span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}


// on the dashboard the user svg icon over navlinks must have a pulse animation that would target the user to folow the user profile, and ask to edit the info.
// On user profile there will be a pulse animate to fill the empty user info field including the image.
// From here a backend request would go out that will include updated user profile info
// {
//     username, 
//     imageURL,
//     user Bio  // may be I need to create a bio field for each user in database.
// }