import { BlogCard } from "../components/BlogCard"


export const Blogs = () => {

  return (
  <>
    <div className=" flex flex-col gap-2 justify-center items-center h-screen w-screen">
      <BlogCard></BlogCard>
      <BlogCard></BlogCard>
    </div>
  </>
  )
}
