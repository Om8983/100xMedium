import { useEffect, useState } from 'react'

import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'


import css from "highlight.js/lib/languages/javascript"
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { Floating } from './Floating'
import { Bubble } from './Bubble'
import { useSetRecoilState } from 'recoil'
import { blogPostData } from '../../store/atoms/editor'
import { AnimatePresence, easeInOut, motion } from 'motion/react'


// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
const Tiptap = () => {
  const [title, setTitle] = useState<string>("")
  const setBlogData = useSetRecoilState(blogPostData)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false
      }),
      Underline,
      Placeholder.configure({
        // Use a placeholder:
        placeholder: "Your content Goes here..."
      }),
      CodeBlockLowlight.configure({
        lowlight
      })
    ],
  })

  // cleanup logic to destroy the editor when the component unmounts( Please Read the README.md for its significance)
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);
  // returning null untill the editor is loaded 
  if (!editor) {
    return null;
  }

  // converting editor data to json content and later back to html content 
  const jsonData: JSONContent = editor.getJSON()

  // one thing to mention since the jsondata would be dynamic so unexpected behaviour may happen while setting it as a state /atom variable. So make sure when jsondata changes only then you have to change the state 
  useEffect(() => {
    setBlogData({ title: title, content: jsonData })
  }, [title, jsonData])
  
  return (
    <>
      <div >
        <Floating editor={editor} />
        <Bubble editor={editor} />
        <div className='relative'>
          <input id='titleInput' maxLength={50} className='max-w-[720px]  max-h-[550px] pb-5 pt-5 mt-6 bg-transparent pl-[20px] pr-[10px] outline-none text-3xl md:text-4xl lg:text-5xl font-[580] placeholder:text-[#8a6842] overflow-auto font-serif tracking-[0.030em] leading-relaxed  ' placeholder='Your Title Goes Here..' onChange={(e) => setTitle(e.target.value)} />
          <AnimatePresence>
            {title.length === 50 &&
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 100, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{
                  duration: 0.5, ease: easeInOut
                }}
                className='text-sm font-serif text-[#ff2a2a] absolute right-0 top-4x'> Title Length Exceeded ( 50 )
              </motion.div>}
          </AnimatePresence>
        </div>
        <EditorContent editor={editor} className='prose text-[#374151]' />
      </div >
    </>
  )
}

export default Tiptap
