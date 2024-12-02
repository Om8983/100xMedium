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
import { useEffect } from "react"
import hljs from "highlight.js"
const lowlight = createLowlight(all)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
export const Blog = ({ username, title, brief, content, publishedAt, imageURL = "" }: Blog) => {
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

    return (
        <div className="flex justify-center md:mx-auto  lg:mx-[15rem] ">
            <div className="flex flex-col justify-start md:w-[500px] lg:w-[600px] mx-6 mt-12 gap-2">
                {/* title of the blog */}
                <div className=" text-3xl font-[580] tracking-wide leading-relaxed md:text-4xl lg:text-5xl font-[boy]  ">
                    {title}
                </div>
                <div className="text-sm font-serif text-[#62728c] md:text-base lg:text-lg">
                    <span className="text-[#0c2142] font-medium">
                        Context :
                    </span>
                    {brief}
                </div>
                {/* author image/svg */}
                <span className="w-full h-[1px] bg-[#8a6842]"></span>
                <div className="flex items-center">
                    {
                        imageURL === "" ?
                            <div className="flex">
                                <img className="w-7 h-7 " src="/user.svg" alt="authorsvg" />
                            </div>
                            :
                            <div>
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
                <span className="w-full h-[1px] bg-[#8a6842]"></span>

                {/* content of the blog */}
                <div className="prose mt-5 text-[#374151] text-sm md:text-xl  ">
                    {parsedContent}
                </div>
            </div>
        </div>
    )
}
