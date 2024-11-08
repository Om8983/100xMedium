import { BlogCard } from "../components/BlogCard"
import { NavLinks } from "../components/NavLinks"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/authHook"
import { useEffect } from "react";
import { useBulkBlog } from "../hooks/bulkBlog";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";

export const Blogs = () => {
  const navigate = useNavigate();
  console.log("hi from blogs");
  

  // user login true auth
  const { response, authLoad } = useAuth()
  useEffect(() => {
    if (response === false) {
      alert("Unauthorized User")
      navigate("/login")
    }
    return () => { }
  }, [response, navigate])

  // populating blogs
  const { data, loading } = useBulkBlog()

  // had to define skeleton here 
  if (authLoad === true) {
    return <p>Loading</p>
  }

  if (loading) {
    return <div className=" flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
      <NavLinks response={response}></NavLinks>
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
    </div>
  }
  return (
    <>
      <div className=" flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
        <NavLinks response={response} />
        {data?.map((blog) => {
          return <BlogCard
            key={blog.id}
            username={blog.author.username}
            datePublished={blog.publishedAt}
            title={blog.title}
            content={blog.content}
            blogID={blog.id}
          ></BlogCard>
        })
        }
      </div>
    </>
  )
}
