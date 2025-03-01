
import { BlogCard } from "../components/BlogCard"
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userLoginAtom } from "../store/atoms/userInfoAtom";
import { UnAuth } from "../components/UnAuth";
import { NavLinks } from "../components/NavBar/NavLinks";
import { AllBlogs } from "../store/atoms/blogFetchAtom";
import { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { useMetadata } from "../hooks/metadata";

export const Blogs = () => {
  interface Blog {
    id: string
    title: string
    brief: string
    content: JSONContent
    publishedAt: string
    postTag: string[]
    author: {
      author_id: string
      username: string
    }
    isSaved: boolean
  }
  const [data, setData] = useState<Blog[]>([])
  const [cursor, setCursor] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ids, setIds] = useState<{ id: string }[]>([])
  const userLogin = useRecoilValue(userLoginAtom)
  const blogData = useRecoilValueLoadable(AllBlogs({ limit: 5, cursor: cursor }))

  // if this would have been declared later in the code, would lead to issues such as not showing the "relogin" if user isn't logged in. Because the useEffects defined will still execute atleast one time while react goes through whole code.  
  if (!userLogin) {
    return <UnAuth></UnAuth>
  }
  useEffect(() => {
    if (blogData.state === "hasValue") {
      setData((prev) => {
        // to avoid duplication of blogs coming in batches
        // const newBlog: Blog[] = blogData.contents.blogs.filter((blog: Blog) => !prev.some(existingBlog => existingBlog.id === blog.id))
        // alternate way to above is below
        const newBlog: Blog[] = blogData.contents.allBlog.filter((blog: Blog) => prev.every(existingBlog => existingBlog.id !== blog.id))
        return [...prev, ...newBlog]
      })
      setIds((prev) => {
        // map is for creating the objectArray structure, & filter is for to avoid duplicate ids 
        const newIdBatch: { id: string }[] = blogData.contents.allBlog.map((blog: Blog) => ({ id: blog.id })).filter((item: { id: string }) => !prev.some(existingId => existingId.id === item.id))
        return [...prev, ...newIdBatch]
      })
      setLoading(false)
    }
  }, [blogData.contents])

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
      if (blogData.state === "hasValue" && blogData.contents.nextCursor !== null && !loading) {
        setLoading(true)
        setCursor(blogData.contents.nextCursor)
      }
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [blogData.contents, loading])

  const { metadata } = useMetadata(ids)

  // data.length === 0 because only on first load the 3 skeleton cards must be visible. And when new blogs are yet to load while scroll then single skeleton must be shown which is coded at bottom of this
  if (blogData.state === "loading" && data.length === 0) {
    return (
      <div className=" flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
        <NavLinks ></NavLinks>
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
    )
  }

  if (blogData.state === "hasError") {
    return (
      <div className="flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover">
        <NavLinks />
        <div className="text-red-500 p-4">
          An unexpected error occurred. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
      <NavLinks />
      {
        data?.map((blog) => {    // i have made it optional cuz if no blog existed on website then it shouldn't throw error instead should show a message like i did in "/myblogs" route
          return <BlogCard
            key={blog.id}
            username={blog.author.username}
            datePublished={blog.publishedAt}
            title={blog.title}
            brief={blog.brief}
            content={blog.content}
            blogID={blog.id}
            tags={blog.postTag}
            metadata={metadata}
          ></BlogCard>
        })
      }
      {
        loading && (
          <BlogCardSkeleton />
        )
      }
      {
        blogData.contents.nextCursor === null && !loading &&
        <div className="text-[#374151] pb-3 ">No more Blogs Exist</div>
      }
    </div >
  )
}
