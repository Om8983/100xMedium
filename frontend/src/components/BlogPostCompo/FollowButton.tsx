import axios, { AxiosError } from "axios"
import { motion } from "motion/react"
import { USERS_BACKEND_URL } from "../../config"
let timer: NodeJS.Timeout

import { toast } from "sonner"
import { useContext, useState } from "react"
import { PostContext } from "../../context/PostContext"
export const FollowButton = () => {

    const blog = useContext(PostContext)
    const [isFollow, setFollow] = useState(blog?.isFollower)
    const debounceFollow = () => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            try {
                setFollow(!isFollow)
                const res = await axios.post(`${USERS_BACKEND_URL}/follow/${blog?.author.id || ""}`, {}, { withCredentials: true })
                if (res.status === 200 && res.data.action === "Follow") {
                    setFollow(res.data.result)
                    toast.success("User Followed Successfully ")
                    return
                }
                setFollow(res.data.result)
                toast.success("User Unfollowed Successfully !!")
                return
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response?.status === 404) {
                        setFollow(false)
                        toast.error("Unauthorized User!")
                        return
                    } else {
                        setFollow(false)
                        toast.error("Internal Server Error!")
                        return
                    }
                }
            }
        }, 800);
    }
    return (
        <>
            <motion.button
                onClick={debounceFollow}
                whileHover={{ scale: 1.1, }}
                className=" border-2 border-[#be8f5a] h-7 text-center text-sm lg:text-[0.9rem] lg:font-medium text-[#8a6842] px-2 rounded-3xl cursor-pointer hover:bg-[#8a6842] hover:text-white ">
                {!isFollow ? "Follow" : "Followed"}
            </motion.button>
        </>
    )
}
