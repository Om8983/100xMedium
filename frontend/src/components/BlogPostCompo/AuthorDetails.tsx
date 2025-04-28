import { motion } from "motion/react"
// import { useState } from "react"
import { SaveButton } from "../BlogCardCompo/SaveButton"
import { FollowButton } from "./FollowButton"
import { useContext } from "react"
import { PostContext } from "../../context/PostContext"
type Prop = {
    item: {
        hidden: { opacity: number, y: number },
        show: { opacity: number, y: number }
    },
}

export const AuthorDetails = ({ item }: Prop) => {
    const blog = useContext(PostContext)
    const imageURL = ""  // for temporary purpose

    return (
        <motion.div variants={item} className="flex justify-between">
            <div className="flex items-center">
                {
                    imageURL === "" ?
                        <div className="flex">
                            <img className="w-7 h-7 " src="/user.svg" alt="authorsvg" />
                        </div>
                        :
                        <div >
                            <img src={imageURL} alt="authorImg" />
                        </div>
                }
                <div className="flex flex-col pl-2">
                    <div className=" font-[590] text-md font-serif lg:text-base " >
                        {blog?.author.username}
                    </div>
                    <div className="text-[#374151] text-xs font-serif ">
                        {blog?.publishedAt}
                    </div>
                </div>
            </div>
            <div className="flex space-x-3 items-center">
                <SaveButton ></SaveButton>
                <FollowButton ></FollowButton>
            </div>
        </motion.div>
    )
}