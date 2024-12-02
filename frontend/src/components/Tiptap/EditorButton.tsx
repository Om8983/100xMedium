

type Props = {
    className?: string
    text: string
    editorClick: () => void
}
export const EditorBtn = ({ className, text, editorClick }: Props) => {
    return (
        <button onClick={editorClick} className={`${className}  `}>
            <i className={`${text} text-sm `}></i>
        </button>
    )
}
