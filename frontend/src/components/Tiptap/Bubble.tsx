import { Editor } from "@tiptap/react"
import { BubbleMenu } from "@tiptap/react"
import { EditorBtn } from "./EditorButton"
type Props = {
    editor: Editor
}
export const Bubble = ({editor} : Props) => {
    return (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className="flex items-center space-x-3 pl-3 bg-[#8a6843] bg-opacity-10 backdrop-blur-lg p-1 ring-1 ring-[#8a6843] rounded-md text-[#7e4f1a]">
                <EditorBtn
                    editorClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}
                    text='fa-solid fa-bold'
                />
                <EditorBtn
                    editorClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}
                    text='fa-solid fa-italic'
                />
                <EditorBtn
                    editorClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}
                    text='fa-solid fa-strikethrough'
                />

                <EditorBtn
                    editorClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'is-active' : ''}
                    text='fa-solid fa-underline'
                />
            </div>
        </BubbleMenu>
    )
}
