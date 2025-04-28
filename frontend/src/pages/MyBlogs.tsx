import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import { UserBlogs } from "../store/atoms/blogFetchAtom"
import { UnAuth } from "../components/UnAuth"
import { userId } from "../store/atoms/userInfoAtom"
import { BlogCard } from "../components/BlogCard"
import { NavLinks } from "../components/NavBar/NavLinks"
import { JSONContent } from "@tiptap/react"
import { Wobble } from "../components/Loader/Wobble"
import { toast } from "sonner"

export const MyBlogs = () => {
    const id = useRecoilValue(userId)
    const blogPost = useRecoilValueLoadable(UserBlogs(id))

    if (blogPost.state === "loading") {
        return <Wobble></Wobble>
    } else if (blogPost.state === "hasError") {
        toast.error("Unexpected Error Occured")
    } else if (blogPost.state === "hasValue") {
        if (blogPost.contents === undefined) {
            return <UnAuth />
        } else {
            type Post = {
                username: string;
                post: {
                    id: string;
                    title: string;
                    brief: string;
                    content: JSONContent;
                    published: boolean;
                    publishedAt: string;
                    author_id: string;
                    postTag: string[];
                }[];
            }
            const user: Post = blogPost.contents.user
            return (
                <>
                    {
                        user.post.length === 0 ?
                            <div className=" flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
                                <NavLinks />
                                <div className="flex justify-center items-center font-serif mt-5"> No Blogs Written Yet!! </div>
                            </div>
                            :
                            <>
                                <div className=" flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
                                    <NavLinks />
                                    {
                                        user.post.map((blog) => {
                                            return (
                                                <div key={blog.id}>
                                                    <BlogCard
                                                        username={user.username}
                                                        datePublished={blog.publishedAt}
                                                        title={blog.title}
                                                        brief={blog.brief}
                                                        content={blog.content}
                                                        blogID={blog.id}
                                                        tags={blog.postTag}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                    }
                </>
            )

        }
    }
}
