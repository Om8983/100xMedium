type Prop = {
    onClick : () => void
}
export const Dropdown = ({onClick}: Partial<Prop>) => {
    return (
        <>
        {/* user svg */}
            <button className="pt-3" onClick={onClick} >
                <img src="/user.svg" className="w-9 h-9" alt="usersvg" />
            </button>
        
        </>
    )
}
