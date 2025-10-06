import { motion } from "motion/react"

type Props = {
    text: string
    className: string
    onclick: () => void
    loading?: boolean
}
export const Button = ({ text, className, onclick, loading }: Partial<Props>) => {
    return (
        <motion.button
            initial={{ opacity: 0, }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.6 }}
            onClick={onclick}
            className={`w-[280px] h-[35px] text-center p-1 ring-1 ring-black rounded-lg transition ease-in-out hover:scale-95 bg-white text-black font-medium outline-none hover:bg-black hover:text-white ${className} `}>
            <p>{loading ? text?.toLowerCase() === "login" ? "Logging In..." : "Signing Up..." : text}</p>
        </motion.button>
    )
}
