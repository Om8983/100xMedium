import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { BLOGS_BACKEND_URL } from "../../config";
import { JSONContent } from "@tiptap/react";
import { toast } from "sonner";

export const SearchBar = () => {
    interface Blog {
        id: string
        title: string,
        brief: string, 
        content: JSONContent
    }
    const [searchVal, setSearchVal] = useState<string>("")
    const { queryStr } = useDebounce(searchVal);
    const [blogPost, setBlogPost] = useState<Blog[]>([])
    useEffect(() => {
        if (queryStr !== "") {
            (async () => {
                try {
                    const res = await axios.get(`${BLOGS_BACKEND_URL}/searchBlog?search=${queryStr}`, { withCredentials: true })
                    if (res.status === 200) {
                        setBlogPost(res.data?.blog)
                    }
                } catch (e) {
                    if (e instanceof AxiosError) {
                        if (e.response?.status === 500) {
                            toast.error("Internal Server Error") // replace with custom alert 
                            return;
                        }
                    }
                }
            })()
        }
        return () => { }
    }, [queryStr, setBlogPost])

    return (
        <>
            <div className="pt-2">
                <input type="text" className="relative min-w-[120px] md:min-w-[300px] lg:min-w-[400px] h-8 bg-transparent backdrop-blur-lg shadow-md rounded-xl ring-1 ring-black placeholder:text-center outline-none lg:p-4 text-left px-2 placeholder:text-gray-600 font-serif" onChange={(e) => setSearchVal(e.target.value)} placeholder="Search Here" />
            </div>
            {
                queryStr.length > 0 &&

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.3
                    }}
                    className="absolute flex flex-col gap-3 min-w-[180px] -right-0 lg:min-w-[400px] md:min-w-[300px] md:-right-0 lg:right-0 max-h-[500px] min-h-5 bg-transparent shadow-orange-200 shadow-2xl rounded-lg top-12 outline-none ring-2 ring-black backdrop-blur-lg p-3 ">
                    {
                        blogPost?.length > 0 ?
                            blogPost?.map((post) => {
                                return (
                                    <Link key={post.id} to={`/blog/id/${post.id}`}>
                                        <div className="grid grid-cols-3 items-center">
                                            <div className="flex flex-col col-span-2">
                                                <span className="text-sm font-semibold font-serif text-[#374151] "> {post.title.slice(0, 20)}</span>
                                                <span className="text-xs font-light text-gray-600  "> {post.brief?.slice(0, 30)}</span>
                                            </div>
                                            <span className="w-[80px] h-[50px] bg-white col-span-1 "><img className="mt-1" src="/logo.svg" alt="" /> </span>
                                        </div>
                                    </Link>
                                )
                            })
                            : <span className=" text-sm text-gray-600 font-medium">No resulults found</span>
                    }
                </motion.div >
            }

        </>

    )
}

