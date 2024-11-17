import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import { UserBlogs } from "../store/atoms/blogFetchAtom"
import { UnAuth } from "../components/UnAuth"
import { userId } from "../store/atoms/userInfoAtom"
import { NavLinks } from "../components/NavLinks"
import { BlogCard } from "../components/BlogCard"


export const MyBlogs = () => {
    const id = useRecoilValue(userId)
    const blogPost = useRecoilValueLoadable(UserBlogs(id))

    if (blogPost.state === "loading") {
        return <p>Loading Blogs...</p>
    } else if (blogPost.state === "hasError") {
        alert("Unexpected Error Occured")
    } else if (blogPost.state === "hasValue") {
        if (blogPost.contents === undefined) {
            return <UnAuth />
        } else {
            type Blog = {
                id: string,
                title: string,
                content: string,
                published: boolean,
                publishedAt: string,
                author_id: string
            }
            type Post = {
                username: string,
                post: Blog[]
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
                            <div className=" flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
                                <NavLinks />
                                {
                                    user.post.map((blog) => {
                                        return (
                                            <>
                                                <BlogCard
                                                    key={blog.id}
                                                    username={"hi"}
                                                    datePublished={blog.publishedAt}
                                                    title={blog.title}
                                                    content={blog.content}
                                                    blogID={blog.id}
                                                />
                                            </>
                                        )
                                    })
                                }
                            </div>

                    }
                </>
            )

        }
    }
}
