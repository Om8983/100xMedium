type Prop = {
    text: string
    svg: string
    onclick: () => void
}
export const DropdownOpt = ({ text, svg, onclick }: Partial<Prop>) => {

    return (
        <button className="flex text-xl md:text-3xl transition-transform ease-out hover:scale-110 cursor-pointer" onClick={onclick} >{text}
            <span>
                <img src={svg} className="w-7 h-7 md:w-9 md:h-9 pl-1 pt-1 " alt="" />
            </span>
        </button>
    )
}
