import { useRecoilValueLoadable } from "recoil"
import { BlogPostData } from "../store/atoms/UserAtom"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../hooks/authHook"
import { useEffect } from "react"
import { BlogPostSkeleton } from "../components/BlogPostSkeleton"
import { NavLinks } from "../components/NavLinks"
import { Blog } from "../components/Blog"

export const Post = () => {
    
    const { response, authLoad } = useAuth();   // this will cause a re-render cuz updating the state
    const navigate = useNavigate();

    // 1. one way that i can use to extract id from search params also called as Dynamic routing
    const { id } = useParams();

    // if id only then state update else a red squiggly would appear over "id" if not conditioned following step
    const blogLoadable = useRecoilValueLoadable(BlogPostData(id ?? "") )   // this will cause a re-render cuz its updating the state

    useEffect(() => {
        if (response === false) {
            alert("Unauthorized User, Please Re-LogIn!")
            navigate('/')
        }
    }, [response, navigate])

    if(authLoad === true){
        return <p>loading</p>
    }
    if (blogLoadable.state === "loading") {
        return <div className="flex flex-col min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover">
            <BlogPostSkeleton></BlogPostSkeleton>
        </div>
    } else if (blogLoadable.state === "hasError") {
        alert("Unexpected error occured")
    } else if (blogLoadable.state === "hasValue") {
        const { blog } = blogLoadable.contents

        return (
            <>
                <div className="flex flex-col min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover">
                    <NavLinks response={response}></NavLinks>
                    <Blog
                        username={blog?.author.username}
                        title={blog?.title}
                        content={blog?.content}
                        publishedAt={blog?.publishedAt}
                        imageURL={blog?.imageURL || null}
                    />
                </div>
            </>
        );
    }
    return null;
}



// 2. other way to pass id from the BlogCard.tsx Link tag, and use useLocation to capture id and pass it to recoil state management
// const location = useLocation();
// const { id } = location.state;