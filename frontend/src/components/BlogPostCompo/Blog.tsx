import { motion } from "motion/react"
import { AuthorDetails } from "./AuthorDetails"
import { HeaderContent } from "./HeaderContent"
import { ParsedContent } from "./ParsedContent"

export const Blog = () => {

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20, staggerChildren: 0.1 } }
    }
    const item = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className="flex justify-center md:mx-auto  lg:mx-[15rem] ">
            <motion.div variants={container} initial={"hidden"} animate={"show"} layout className="flex flex-col justify-start md:w-[500px] lg:w-[600px] mx-6 mt-12 gap-2">
                {/* title of the blog */}
                <HeaderContent item={item}></HeaderContent>

                {/* author image/svg */}
                <motion.span variants={item} className="w-full h-[1px] bg-[#8a6842]"></motion.span>
                <AuthorDetails item={item}></AuthorDetails>
                <motion.span variants={item} className="w-full h-[1px] bg-[#8a6842]"></motion.span>

                {/* content of the blog */}
                <ParsedContent item={item}></ParsedContent>
            </motion.div>
        </div>
    )
}
