import { useRecoilValueLoadable } from "recoil"
import { BlogPostData } from "../store/atoms/blogFetchAtom"
import { useNavigate, useParams } from "react-router-dom"
import { BlogPostSkeleton } from "../components/BlogPostSkeleton"
import { Blog } from "../components/BlogPostCompo/Blog"
import { NavLinks } from "../components/NavBar/NavLinks"
import { JSONContent } from "@tiptap/react"
import { PostContext } from "../context/PostContext"
import { toast } from "sonner"

export type Blog = {
    title: string
    brief: string
    imageURL : string
    content: JSONContent
    publishedAt: string
    author: {
        id: string
        username: string
    }
    isSaved: boolean
    isFollower: boolean
}

export const Post = () => {

    const navigate = useNavigate();

    // 1. one way that i can use to extract id from search params also called as Dynamic routing
    const { id } = useParams();

    // if id only then state update else a red squiggly would appear over "id" if not conditioned following step
    const blogLoadable = useRecoilValueLoadable(BlogPostData(id ?? ""))   // this will cause a re-render cuz its updating the state

    const handleLoginNav = () => {
        navigate("/login")
    }
    if (blogLoadable.state === "loading") {
        return <div className="flex flex-col min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover">
            <BlogPostSkeleton></BlogPostSkeleton>
        </div>
    } else if (blogLoadable.state === "hasError") {
        toast.error("Unexpected error occured")
    } else if (blogLoadable.state === "hasValue") {
        if (blogLoadable.contents === undefined) {
            return (
                <>
                    <div className="flex h-screen justify-center items-center bg-[#011e2b] ">
                        <div className=" flex flex-col gap-4 bg-[#0f4c68] w-[500px] h-[300px] rounded-md p-5">
                            <h1 className="text-3xl text-white font-semibold">No data Found</h1>
                            <p className="text-white text-xl">Reason :</p>
                            <ul className="text-gray-400">
                                <li>User Not Authenticated</li>
                                <li>Blog Doesn't Exist</li>
                            </ul>
                            <p className="text-white text-xl">Possible Fixes : </p>
                            <button onClick={handleLoginNav} className="w-[150px] p-1 font-semibold bg-white rounded-md self-center">Re-Login</button>
                        </div>
                    </div>
                </>
            )
        } else {
            const blog: Blog = blogLoadable.contents.blog

            return (
                <>
                    {
                        blog &&
                        <div className="flex flex-col min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover">
                            <NavLinks ></NavLinks>
                            <PostContext.Provider value={blog}>
                                <Blog />
                            </PostContext.Provider>
                        </div>
                    }
                </>
            );
        }
    }
    return null;
}



// 2. other way to pass id from the BlogCard.tsx Link tag, and use useLocation to capture id and pass it to recoil state management
// const location = useLocation();
// const { id } = location.state;

