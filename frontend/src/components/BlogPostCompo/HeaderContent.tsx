import { motion } from "motion/react"
type Prop = {
    title: string,
    brief: string,
    item: {}
}
export const HeaderContent = ({ title, brief, item }: Prop) => {
    return (
        <>
            <motion.div variants={item} className=" text-3xl font-[580] tracking-wide leading-relaxed md:text-4xl lg:text-5xl font-[boy]  ">
                {title}
            </motion.div>
            <motion.div variants={item} className="text-sm font-serif text-[#7e8a9e] md:text-base lg:text-lg">
                <span className="text-[#0c2142] font-medium">
                    Context :
                </span>
                <span>{brief}</span>
            </motion.div>
        </>
    )
}
