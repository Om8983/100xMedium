import { useEffect, useState } from "react"
import { useDebounce } from "../hooks/useDebounce"
import axios, { AxiosError } from "axios";
import { BLOGS_BACKEND_URL } from "../config";
import { motion } from "motion/react";

import { Link } from "react-router-dom";


export const SearchBar = () => {
    interface Blog {
        id: string
        title: string,
        content: string
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
                        if (e.response?.status === 401) {
                            console.log("unauth user");
                            return
                        }
                        if (e.response?.status === 500) {
                            console.log("backend err");
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
                <input type="text" className="relative w-[120px] md:w-[300px] lg:w-[400px] h-8 bg-transparent backdrop-blur-lg shadow-md rounded-xl border-2 border-black placeholder:text-center outline-none lg:p-4 text-left px-2" onChange={(e) => setSearchVal(e.target.value)} placeholder="Search Here" />
            </div>
            {
                queryStr.length > 0 &&

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.3
                    }}
                    className="absolute flex flex-col gap-3 w-[280px] sm:-right-16 lg:w-[400px] md:w-[350px] md:-right-5 lg:right-0 max-h-[500px] min-h-5 bg-transparent shadow-orange-200 shadow-2xl rounded-lg top-12 outline-none ring-2 ring-black backdrop-blur-lg p-3 ">
                    {
                        blogPost?.length > 0 ?
                            blogPost?.map((post) => {
                                return (
                                    <Link key={post.id} to={`/blog/id/${post.id}`}>
                                        <div className="grid grid-cols-3 items-center">
                                            <div className="flex flex-col col-span-2">
                                                <span className="text-sm font-medium  "> {post.title?.slice(0, 20)}</span>
                                                <span className="text-xs font-light text-gray-600  "> {post.content?.slice(0, 35)}...</span>
                                            </div>
                                            <span className="w-[80px] h-[50px] bg-white col-span-1 "><img src="/logo.svg" alt="" /> </span>
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

