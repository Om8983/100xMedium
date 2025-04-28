
import { motion } from "motion/react"
import { useContext, useEffect } from "react";

// dependencies to correctly import and convert the data to readable format.
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Underline from "@tiptap/extension-underline"
import { generateHTML } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { HTMLReactParserOptions, DOMNode, Element } from "html-react-parser"
import parse from "html-react-parser"


// importing dependencies to get the same styling as of initial
import { all, createLowlight } from 'lowlight'
import css from "highlight.js/lib/languages/javascript"
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import hljs from "highlight.js"
import { PostContext } from "../../context/PostContext";

// configuring the lowlight for different scripts 
const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

export const ParsedContent = ({ item }: {
    item: {
        hidden: { opacity: number, y: number },
    }
}) => {
    const blog = useContext(PostContext)

    const htmlContent = generateHTML(blog?.content || {}, [StarterKit.configure({ codeBlock: false }), Underline, CodeBlockLowlight.configure({ lowlight })])
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
    return (
        <motion.div variants={item} initial={"hidden"} animate={"show"} className="prose mt-5 text-[#374151] text-sm md:text-xl  ">
            {parsedContent}
        </motion.div>
    )
}
