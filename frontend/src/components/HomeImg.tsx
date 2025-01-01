import { animate, delay, motion } from "motion/react"

type Prop = {
    className: string
}
export const HomeImg = ({ className }: Partial<Prop>) => {
    const parentVariant = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                delayChildren: 1,
                staggerChildren: 0.2
            }
        }
    }
    const childVariant = {
        initial: { opacity: 0, y: -100 },
        animate: { opacity: 1, y: 0, transition: { type : "spring", stiffness :110, damping : 10 } }
    }
    return (
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ type: "spring", stiffness: 50, damping: 10, restDelta: 0.014, restSpeed: 0.05 }} className={`${className} relative hidden lg:block self-center pl-28 `}>
            <div className="absolute bg-black border-2 border-black rounded-3xl border-t-0 border-l-0 lg:w-[450px] lg:h-[300px] ml-2 mt-2 "></div>
            <div className="relative w-[450px] h-[300px] bg-white  border-2 border-black rounded-3xl" >
                <div className="flex justify-between  border-b-2 border-black pt-3">
                    <motion.div variants={parentVariant} initial="initial" animate="animate" className=" font-[myfont] tracking-wider pl-4 text-2xl">
                        <motion.p variants={childVariant}>Henri Matisse</motion.p>
                    </motion.div>

                    <motion.div variants={parentVariant} initial="initial" animate="animate" className="flex gap-1 pr-6 pt-3">
                        <motion.span variants={childVariant} className=" w-2 h-2 rounded-full bg-black"></motion.span>
                        <motion.span variants={childVariant} className=" w-2 h-2 rounded-full bg-black"></motion.span>
                        <motion.span variants={childVariant} className=" w-2 h-2 rounded-full bg-black"></motion.span>
                    </motion.div>
                </div>
                <motion.div variants={parentVariant} initial="initial" animate="animate" className=" grid grid-cols-3 ">
                    <motion.div variants={childVariant} className="col-span-2 text-2xl font-[myfont] pt-20 pl-3 font-semibold  ">
                        Don't wait for inspiration, it comes while working
                        <motion.p variants={childVariant} className="text-xs text-gray-400 pt-3"> - French Painter, Prominent Figure In Modern Art</motion.p>
                    </motion.div>
                    <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 0.5, ease : "easeIn", delay : 1}} className="pt-16 pl-6 " >
                        <img src="https://www.henrimatisse.org/assets/img/henri-matisse.jpg" className="w-[110px] h-[110px] border-2 border-black rounded-3xl " alt="" />
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    )
}
