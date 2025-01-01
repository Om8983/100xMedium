import { motion } from "motion/react"

type Prop = {
    text: string
    svg: string
    onclick: () => void
    className: string
}
export const DropdownOpt = ({ text, svg, onclick, className }: Partial<Prop>) => {

    return (
        <motion.button
            whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: "easeOut" } }}
            className={`flex text-xl md:text-3xl cursor-pointer font-serif text-[#374151] ${className}`} onClick={onclick} >{text}
            <span>
                <img src={svg} className="w-7 h-7 md:w-9 md:h-9 pl-1 pt-1 " alt="" />
            </span>
        </motion.button>
    )
}
