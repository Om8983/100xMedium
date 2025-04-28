import { motion } from "motion/react"
import { useContext } from "react"
import { PostContext } from "../../context/PostContext"
type Prop = {
    item: {}
}
export const HeaderContent = ({ item }: Prop) => {
    const blog = useContext(PostContext)
    return (
        <>
            <motion.div variants={item} className=" text-3xl font-[580] tracking-wide leading-relaxed md:text-4xl lg:text-5xl font-[boy]  ">
                {blog?.title}
            </motion.div>
            <motion.div variants={item} className="text-sm font-serif text-[#7e8a9e] md:text-base lg:text-lg">
                <span className="text-[#0c2142] font-medium">
                    Context :
                </span>
                <span>{blog?.brief}</span>
            </motion.div>
        </>
    )
}
