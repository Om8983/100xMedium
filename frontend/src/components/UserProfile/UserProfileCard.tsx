
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { useRef, useState } from "react"
import { UserUpdate } from "@om_wadhi/common"
import axios, { AxiosError } from "axios"
import { USERS_BACKEND_URL } from "../../config"
import { UserEmailProfile } from "./UserEmailProfile"
import { verifiedEmail } from "../../store/atoms/userInfoAtom"
import CountDown from "../Counter/CountDown"
import { NavLinks } from "../NavBar/NavLinks"
import { ProfileStats } from "./ProfileStats"
import { toast } from "sonner"

type Props = {
    username: string
    email: string
    onClickLogout: () => void
    onClickSendOtp: () => void
    box: boolean
    onClickVerify: () => void
}
export const UserProfileCard = ({ username, email, onClickLogout, onClickSendOtp, box, onClickVerify }: Props) => {

    const navigate = useNavigate();
    const [edit, setEdit] = useState(false)
    const verified = useRecoilValue(verifiedEmail)

    const [changes, setChanges] = useState<UserUpdate>({
        username: username,
        email: email
    })
    const fieldUpdate = useRef<UserUpdate>({})  // just because there's no need of setState() function by the useState hook so useRef


    const handleChange = (field: string, changedVal: string) => {
        setChanges((prev) => ({
            ...prev, [field]: changedVal
        }))
    }
    // explanation to this is in README.md file
    const handleSave = async () => {
        try {
            if (changes.username !== username) {
                fieldUpdate.current.username = changes.username
            }
            if (changes.email !== email) {
                fieldUpdate.current.email = changes.email
            }
            if (changes.username === username && changes.email === email) {
                // console.log("No changes were made "); instead you can add a custom popup containing
                setEdit(false)
                return
            }

            const res = await axios.put(`${USERS_BACKEND_URL}/updateUser`, fieldUpdate, { withCredentials: true })
            if (res.status === 200) {
                toast.success("User Info Updated Successfully")
                setEdit(false)
            }

        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 401) {
                    toast.error("User Unauthorized")
                    navigate("/login")
                }
                if (e.response?.status === 403) {
                    toast.error("Please enter Valid Information")
                }
                if (e.response?.status === 500) {
                    toast.error("Internal Server Error!!")
                }
            }
        }
    }


    return (
        <>
            <div className="  w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
                <NavLinks />

                <div className="flex flex-col items-center md:grid md:grid-cols-4 md:my-[10rem] mt-5 lg:mt-24 ">
                    {/* user img */}
                    <div className="w-32 h-32 bg-orange-50 rounded-full outline-none col-span-2 col-start-1 md:mx-auto md:w-44 md:h-44 lg:w-[14rem] lg:h-[14rem] overflow-hidden">
                        <img src="/user.svg" alt="userImg" />
                    </div>

                    {/* details */}
                    <div className="flex flex-col items-center ">
                        {/* profile stats includes follower and following and post count */}
                        <ProfileStats></ProfileStats>

                        {/* edit profile btn */}
                        <button className="bg-[#ececec] self-center px-2 py-1 rounded-md text-sm font-serif font-medium mt-5 md:mt-6 lg:text-base lg:px-3" onClick={() => setEdit(true)} >
                            Edit Profile
                        </button>

                        {/* save btn */}
                        {
                            edit &&
                            <div className="flex gap-5">
                                <button className="bg-[#ececec] px-3 py-1 rounded-md text-sm font-serif font-medium mt-4 md:mt-3 lg:mt-5 lg:text-base lg:px-2" onClick={handleSave} >
                                    Save
                                </button>
                                <button className="bg-[#ececec] px-2 py-1 rounded-md text-sm font-serif font-medium mt-4 md:mt-3 lg:mt-5 lg:text-base lg:px-2" onClick={() => setEdit(false)} >
                                    Cancel
                                </button>
                            </div>
                        }

                        {/* username & email */}
                        <UserEmailProfile edit={edit} nameVal={changes.username ?? ""} emailVal={changes.email ?? ""} setOnChange={handleChange} />

                        {/* verify btn*/}
                        {
                            !verified && !box &&
                            <button className="bg-[#ececec] px-2 py-1 self-center rounded-md text-sm font-serif font-medium mt-5 md:mt-6 lg:text-base" onClick={onClickSendOtp} >
                                Verify Email
                            </button>
                        }

                        {/* verified */}
                        {
                            verified &&
                            <button className="bg-orange-200 flex gap-1 items-center px-2 py-1 rounded-md text-sm font-serif font-medium text-gray-500 mt-5 md:mt-6 lg:text-lg" disabled >
                                Verified
                                <span className="w-5 h-5"><img src="/check.svg" alt="checked" /></span>
                            </button>
                        }

                        {/* verify with otp box */}
                        {
                            !verified && box &&
                            <>
                                <div className="flex items-center gap-3 mt-5 mb-2 md:mt-6 md:mb-3 lg:mt-10 lg:gap-4">
                                    <input type="text" className="w-[8rem] min-h-[1.7rem] bg-orange-50 rounded-md outline-none text-center text-sm lg:text-base lg:w-[9rem] " placeholder="Enter OTP" />
                                    <button className="bg-orange-200 flex gap-1 px-2 py-1 rounded-md text-center text-sm font-serif font-medium md:w-[6rem] md:px-3 lg:text-sm " onClick={onClickVerify} >
                                        Verify OTP
                                    </button>
                                </div>
                                {/* countdown timer */}
                                <CountDown />
                            </>

                        }

                        {/* logout btn */}
                        <button className="bg-orange-200 flex items-center gap-1 px-2 py-1 rounded-md text-sm font-serif font-medium mt-5 md:mt-10 self-center lg:text-base" onClick={onClickLogout} >
                            Log Out
                            <span className="w-5 h-5"><img src="/logout.svg" alt="" /></span>
                        </button>
                    </div>
                </div>
            </div>
        </>
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