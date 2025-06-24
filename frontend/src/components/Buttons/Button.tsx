import { motion } from "motion/react"

type Props = {
    text: string
    className: string
    onclick: () => void
}
export const Button = ({ text, className, onclick }: Partial<Props>) => {
    return (
        <motion.button
            initial={{ opacity: 0, }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.6 }}
            onClick={onclick}
            className={`w-[280px] h-[35px] text-center p-1 ring-1 ring-black rounded-lg transition ease-in-out hover:scale-95 bg-white text-black font-medium outline-none ${className} `}>
            <p>{text}</p>
        </motion.button>
    )
}
