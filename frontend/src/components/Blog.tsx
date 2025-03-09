import { useEffect } from "react"
import { motion } from "motion/react"
// dependencies to correctly import and convert the data to readable format.
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Underline from "@tiptap/extension-underline"
import { generateHTML, JSONContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { HTMLReactParserOptions, DOMNode, Element } from "html-react-parser"
import parse from "html-react-parser"
import { AuthorDetails } from "./BlogPostCompo/authorDetails"

type Blog = {
    username: string
    // userId : string    onclick userimage following to backend req that sends user info and loads a "userProfile for other users" component 
    title: string
    brief: string
    content: JSONContent
    publishedAt: string
    imageURL?: string
    isSaved: boolean
}

// importing dependencies to get the same styling as of initial
import { all, createLowlight } from 'lowlight'
import css from "highlight.js/lib/languages/javascript"
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import hljs from "highlight.js"
import { HeaderContent } from "./BlogPostCompo/HeaderContent"

// configuring the lowlight for different scripts 
const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

export const Blog = ({ username, title, brief, content, publishedAt, imageURL = "", isSaved }: Blog) => {
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
                <HeaderContent title={title} brief={brief} item={item}></HeaderContent>

                {/* author image/svg */}
                <motion.span variants={item} className="w-full h-[1px] bg-[#8a6842]"></motion.span>
                <AuthorDetails username={username} publishedAt={publishedAt} imageURL={imageURL} item={item} ></AuthorDetails>
                <motion.span variants={item} className="w-full h-[1px] bg-[#8a6842]"></motion.span>

                {/* content of the blog */}
                <motion.div variants={item} initial={"hidden"} animate={"show"} className="prose mt-5 text-[#374151] text-sm md:text-xl  ">
                    {parsedContent}
                </motion.div>
            </motion.div>
        </div>
    )
}
