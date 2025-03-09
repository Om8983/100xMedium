import { motion } from "motion/react"
// import { useState } from "react"
import { SaveButton } from "../BlogCardCompo/SaveButton"
type Prop = {
    username: string,
    publishedAt: string,
    item: {},
    imageURL: string
}

export const AuthorDetails = ({ username, publishedAt, imageURL, item }: Prop) => {

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
                        {username}
                    </div>
                    <div className="text-[#374151] text-xs font-serif ">
                        {publishedAt}
                    </div>
                </div>
            </div>
            <div className="flex space-x-3 items-center">
                <SaveButton ></SaveButton>
                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: "#8a6842" }}
                    className="bg-[#be8f5a] h-7 text-center text-sm lg:text-[0.8rem] text-white px-2 rounded-3xl">
                    Follow
                </motion.button>
            </div>
        </motion.div>
    )
}
