type Props = {
    text: string
    className: string
    onclick : () => void
}
export const Button = ({ text, className,onclick }: Partial<Props>) => {
    return (
        <button onClick={onclick} className={`w-[280px] h-[35px] text-center p-1 ring-1 ring-black rounded-lg transition ease-in-out hover:scale-95 bg-black  text-white outline-none ${className} `}>
            {text}
        </button>
    )
}
