import { BlogCard } from "../components/BlogCard"
import { NavLinks } from "../components/NavBar/NavLinks"
import { JSONContent } from "@tiptap/react"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { BLOGS_BACKEND_URL } from "../config"
import { useMetadata } from "../hooks/metadata"
import { BlogCardSkeleton } from "../components/BlogCardSkeleton"

export const SavedBlogs = () => {
    type Post = {
        user: {
            username: string
        }
        post: {
            id: string;
            title: string;
            brief: string;
            content: JSONContent;
            published: boolean;
            publishedAt: string;
            author_id: string;
            postTag: string[];
        }
    };

    const [savedBlog, setSavedBlog] = useState<Post[]>()
    const [ids, setIds] = useState<{ id: string }[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${BLOGS_BACKEND_URL}/savedBlogs`, { withCredentials: true })
                if (res.status === 200) {
                    setSavedBlog(res.data.savedBlogs)
                    setIds((prev) => {
                        // map is for creating the objectArray structure, & filter is for to avoid duplicate ids 
                        const newIdBatch: { id: string }[] = res.data.savedBlogs.map((blog: Post) => ({ id: blog.post.id })).filter((item: Post) => !prev.some(existing => existing.id === item.post.id))
                        return [...prev, ...newIdBatch]
                    })
                    setLoading(false)
                }
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.status === 401) {
                        alert("Unauthorized Request")
                    } else {
                        alert("Internal Server Error")
                    }
                }
            }
        })()
        return () => { }
    }, [])
    // metadata now stored to recoil atom in order to avoid inconsistencies which was (if i'm not wrong) too much re-evaluation or repeatable functions being performed due to re-rendering
    useMetadata(ids)

    return (
        <>
            {
                savedBlog?.length === 0 ?
                    <div className=" flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
                        <NavLinks />
                        <div className="flex justify-center items-center font-serif mt-5"> No Blogs Saved Yet!! </div>
                    </div>
                    :
                    <>
                        {!loading && ids.length >= 1 ?
                            <div className=" flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
                                <NavLinks />
                                {
                                    savedBlog?.map((blog) => {

                                        return (
                                            <div key={blog.post.id}>
                                                <BlogCard
                                                    username={blog.user.username}
                                                    datePublished={blog.post.publishedAt}
                                                    title={blog.post.title}
                                                    brief={blog.post.brief}
                                                    content={blog.post.content}
                                                    blogID={blog.post.id}
                                                    tags={blog.post.postTag}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            :
                            <div className=" flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
                                <NavLinks />
                                <BlogCardSkeleton></BlogCardSkeleton>
                                <BlogCardSkeleton></BlogCardSkeleton>
                                <BlogCardSkeleton></BlogCardSkeleton>
                            </div>

                        }
                    </>
            }
        </>
    )

}