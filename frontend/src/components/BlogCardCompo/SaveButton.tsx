import { motion } from "motion/react"
import { useState } from "react"
type Prop = {
    toggleSave: () => void,
    saved: boolean
}
export const SaveButton = ({ toggleSave, saved }: Prop) => {
    const [hover, setHover] = useState(false)

    return (
        <motion.button
            whileHover={{ scale: 1.2 }}
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            onClick={toggleSave}
            className="relative cursor-pointer pl-1 self-center outline-none"
        >
            <motion.svg
                style={{ outline: 0 }}
                width="18"
                height="20"
                viewBox="0 0 12 13"
                fill={saved ? "black" : "none"}
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.69166 1.00018L1 1.00159L1.00205 10.7432L4.82498 6.56741L8.64967 10.7416L8.6482 3.78329"
                    stroke="#374151" />
                <path
                    d="M10 0V4"
                    stroke="#374151" />
                <path
                    d="M8 2H12"
                    stroke="#374151" />
            </motion.svg>

            {
                hover && !saved &&
                <motion.span
                    animate={{ scale: [0, 0.5, 0.8, 0.9, 1], y: [20, -10, -25, -30, 0] }}
                    transition={{ duration: 0.5, times: [0, 0.3, 0.5, 0.8, 1] }}
                    className="absolute bottom-6 -left-12 z-20 rounded-md w-[120px] h-auto p-1 text-center text-[0.55rem] text-[#374151] bg-[#ececec] font-medium">
                    Save to Your Favourites
                </motion.span>
            }
        </motion.button>
    )
}
