import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Underline from "@tiptap/extension-underline"
import { generateHTML, JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { HTMLReactParserOptions, DOMNode, Element } from "html-react-parser"
import parse from "html-react-parser"

type Blog = {
    username: string
    // userId : string    onclick userimage following to backend req that sends user info and loads a "userProfile for other users" component 
    title: string
    brief: string
    content: JSONContent
    publishedAt: string
    imageURL?: string
}

import { all, createLowlight } from 'lowlight'
import css from "highlight.js/lib/languages/javascript"
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { useEffect, useState } from "react"
import hljs from "highlight.js"
import { motion } from "motion/react"
const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

export const Blog = ({ username, title, brief, content, publishedAt, imageURL = "" }: Blog) => {
    const [hover, setHover] = useState(false)
    const [fill, setFill] = useState('none')
    const htmlContent = generateHTML(content, [StarterKit.configure({ codeBlock: false }), Underline, CodeBlockLowlight.configure({ lowlight })])
    // explanation for this useEffect in Readme file 
    useEffect(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block as HTMLElement);
        });
    }, [htmlContent]);
    const options: HTMLReactParserOptions = {
        replace(domNode: DOMNode) {
            if (
                domNode instanceof Element &&
                domNode.attribs &&
                domNode.attribs.class === 'remove'
            ) {
                return <></>;
            }
        },
    };
    const parsedContent = parse(htmlContent, options)
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20, staggerChildren: 0.1 } }
    }
    const item = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 }
    }

    return (
        <div className="flex justify-center md:mx-auto  lg:mx-[15rem] ">
            <motion.div variants={container} initial={"hidden"} animate={"show"} layout className="flex flex-col justify-start md:w-[500px] lg:w-[600px] mx-6 mt-12 gap-2">
                {/* title of the blog */}
                <motion.div variants={item} className=" text-3xl font-[580] tracking-wide leading-relaxed md:text-4xl lg:text-5xl font-[boy]  ">
                    {title}
                </motion.div>
                <motion.div variants={item} className="text-sm font-serif text-[#7e8a9e] md:text-base lg:text-lg">
                    <span className="text-[#0c2142] font-medium">
                        Context :
                    </span>
                    <span>{brief}</span>
                </motion.div>
                {/* author image/svg */}
                <motion.span variants={item} className="w-full h-[1px] bg-[#8a6842]"></motion.span>
                <motion.div variants={item} className="flex justify-between">
                    <div className="flex items-center">
                        {
                            imageURL === "" ?
                                <div className="flex">
                                    <img className="w-7 h-7 " src="/user.svg" alt="authorsvg" />
                                </div>
                                :
                                <div >
                                    <img src={imageURL} alt="authorImg" />
                                </div>
                        }
                        <div className="flex flex-col pl-2">
                            <div className=" font-[590] text-md font-serif lg:text-base " >
                                {username}
                            </div>
                            <div className="text-[#374151] text-xs font-serif ">
                                {publishedAt}
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3 items-center">
                        <motion.div

                            whileHover={{ scale: 1.2 }}
                            onHoverStart={() => setHover(true)}
                            onHoverEnd={() => setHover(false)}
                            className="relative cursor-pointer pl-1 self-center outline-none"
                        >

                            <motion.svg style={{ outline: 0 }} width="18" height="20" viewBox="0 0 12 13" fill={fill} xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.69166 1.00018L1 1.00159L1.00205 10.7432L4.82498 6.56741L8.64967 10.7416L8.6482 3.78329" stroke="#8a6842" />
                                <path d="M10 0V4" stroke="#8a6842" />
                                <path d="M8 2H12" stroke="#8a6842" />
                            </motion.svg>

                            {
                                hover &&
                                <motion.span
                                    animate={{ scale: [0, 0.5, 0.8, 0.9, 1], y: [20, -10, -25, -30, 0] }}
                                    transition={{ duration: 0.5, times: [0, 0.3, 0.5, 0.8, 1] }}
                                    layout
                                    className="absolute bottom-6 -left-12 z-20 rounded-md w-[120px] h-auto p-1 text-center text-[0.55rem] text-[#374151] bg-[#ececec] font-medium">
                                    Save to Your Favourites
                                </motion.span>
                            }
                        </motion.div>
                        <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: "#8a6842" }}
                            className="bg-[#be8f5a] h-7 text-center text-sm lg:text-[0.8rem] text-white px-2 rounded-3xl">
                            Follow
                        </motion.button>
                    </div>
                </motion.div>
                <motion.span variants={item} className="w-full h-[1px] bg-[#8a6842]"></motion.span>

                {/* content of the blog */}
                <motion.div variants={item} initial={"hidden"} animate={"show"} className="prose mt-5 text-[#374151] text-sm md:text-xl  ">
                    {parsedContent}
                </motion.div>
            </motion.div>
        </div>
    )
}
