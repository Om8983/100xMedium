import { motion } from "motion/react"
import { ChangeEvent, Dispatch } from "react"

type Props = {
    type?: string
    className?: string
    id?: string
    placeholder?: string
    setValue: Dispatch<React.SetStateAction<string>>
}
export const InputBox = ({ type, id, placeholder, setValue }: Props) => {

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return (
        <>
            <motion.input initial={{ opacity: 0, }} animate={{ opacity: 1,}} transition={{ duration: 0.5, ease: "easeInOut", delay : 0.5}} type={type} id={id} className={` w-[280px] h-[40px]  p-2 text-start ring-1 ring-gray-600 rounded-lg transition-transform delay-150 ease-in hover:scale-110 hover:ring-slate-600  outline-none`} placeholder={placeholder} onChange={handleOnChange}>
            </motion.input>
        </>
    )
}

