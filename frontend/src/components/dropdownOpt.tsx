type Prop = {
    text : string
    svg : string 
}
export const DropdownOpt = ({text, svg} : Partial<Prop>) => {
    return (
        <div className="flex text-xl md:text-3xl transition-transform ease-out hover:scale-110 cursor-pointer">{text} <span>
            <img src={svg} className="w-7 h-7 md:w-9 md:h-9 pl-1 pt-1 " alt="" /></span></div>
    )
}
