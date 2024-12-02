import { EditorBtn } from "./EditorButton"
import { Editor } from "@tiptap/react"
import { FloatingMenu } from "@tiptap/react"
type Props = {
  editor: Editor
}
export const Floating = ({ editor }: Props) => {
  return (
    <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }} >
      <div className="flex items-center max-h-7 space-x-3 pl-3 bg-[#8a6843] bg-opacity-10 backdrop-blur-lg p-1 ring-1 ring-[#8a6843] rounded-md text-[#7e4f1a]  ">

        {/* <button onClick={addImage}><i className='bi bi-card-image'></i></button> */}
        <EditorBtn editorClick={() => editor?.chain().focus().toggleBulletList().run()} className={`${editor?.isActive('bulletList') ? 'is-active' : ''}`} text='fas fa-thin fa-list' />

        <EditorBtn editorClick={() => {
          editor?.chain().focus().toggleOrderedList().run()
        }} className={`${editor?.isActive('orderedList') ? 'is-active' : ''} `} text='fa-solid fa-list-ol' />

        <EditorBtn editorClick={() => editor?.chain().focus().toggleCodeBlock().run()} className={editor?.isActive('codeBlock') ? 'is-active' : ''} text='fa-solid fa-code' />

        <EditorBtn editorClick={() => {
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }} className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''} text='fa-solid fa-h' />

        <EditorBtn editorClick={() => {
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }} className={editor?.isActive('heading', { level: 3 }) ? 'is-active' : ''} text='bi bi-type-h2' />

        <EditorBtn editorClick={() => {
          editor?.chain().focus().setHorizontalRule().run()
        }} text='fa-solid fa-minus' />

      </div>
    </FloatingMenu>
  )
}
