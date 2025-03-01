
import { Link } from "react-router-dom"
import { JSONContent } from "@tiptap/react"
import { motion } from "motion/react"
import React, { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { BLOGS_BACKEND_URL } from "../config"
import { LikeButton } from "./BlogCardCompo/LikeButton"
import { SaveButton } from "./BlogCardCompo/SaveButton"
import { BlogData } from "./BlogCardCompo/BlogData"
import { BlogImg } from "./BlogCardCompo/BlogImg"
import { BlogTags } from "./BlogCardCompo/BlogTags"

type Prop = {
  username: string
  title: string
  brief: string
  content: JSONContent
  datePublished: string
  imageURL?: string
  blogID: string
  tags: string[]
  metadata?: { id: string, likeCount: number, isSaved: boolean }[]
}
// these timer are declared outside so that they both can be used anywhere within any function 
let debounceSaveTimer: NodeJS.Timeout
let debounceLikeTimer: NodeJS.Timeout
// React.memo was used cuz i think motion can cause re-renders and disturb the rendering process, so.....
export const BlogCard = React.memo(({ username, title, datePublished, brief, imageURL, blogID, tags, metadata }: Prop) => {

  const [saved, setSaved] = useState<boolean>(false)
  const [visible, setVisible] = useState(false)
  const [like, setLike] = useState<number>()
  const [isLiked, setIsLike] = useState<boolean>(false)

  const blogPost = metadata?.find(item => item.id === blogID)

  useEffect(() => {
    setLike(blogPost?.likeCount)
    setSaved(blogPost?.isSaved!)
  }, [blogPost])

  const debounceSave = () => {
    clearTimeout(debounceSaveTimer)
    debounceSaveTimer = setTimeout(async () => {
      try {
        const res = await axios.post(`${BLOGS_BACKEND_URL}/save/${blogID}`, {}, { withCredentials: true })
        if (res.status === 200) {
          setSaved(res.data.postSaved)
        }
        // i seperated below conditional cuz on each toggle setVisible was true causing inconsistency. So if only postSaved response is true then only setVisible to true
        if (res.status === 200 && res.data.postSaved) {
          setVisible(true)
        }
      } catch (e) {
        setSaved(false)
        if (e instanceof AxiosError) {
          if (e.response?.status === 401) {
            alert("Unauthorized User!!")
          } else if (e.response?.status === 404) {
            alert("No such post exist!")
          } else {
            alert("Internal Server Error")
          }
        }
      }
    }, 800);

  }

  const toggleSave = () => {
    setSaved(!saved)
    debounceSave()
  }
  // the advantage of debounced like is explained in readme.md
  const debounceLike = () => {
    clearTimeout(debounceLikeTimer)
    debounceLikeTimer = setTimeout(async () => {
      try {
        const res = await axios.post(`${BLOGS_BACKEND_URL}/upvote`, {}, { params: { blogId: blogID }, withCredentials: true })
        if (res.status === 200) {
          setLike(res.data.result.likeCount)
          setIsLike(res.data.result.isLiked)
        }
      } catch (e) {
        setLike(blogPost?.likeCount)
        setIsLike(false)
        if (e instanceof AxiosError) {
          if (e.response?.status === 401) {
            alert("User Unauthorized");
          } else {
            alert("Internal server error")
          }
        }
      }
    }, 1000)
  }

  const toggleLike = () => {
    !isLiked ? setLike(prev => prev! + 1) : setLike(prev => prev! - 1)
    setIsLike(prev => !prev)
    debounceLike()
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0, offset: ["start center"] }}
        transition={{ type: "spring", stiffness: 100, damping: 20, restDelta: 0.015, }}
        className="relative m-2 cursor-pointer border-2 rounded-2xl bg-transparent backdrop-blur-lg border-black p-3 w-[400px] lg:p-4 md:w-[500px] lg:w-[700px] lg:max-h-[250px] mt-5 shadow-xl"
      >

        <Link to={`/blog/id/${blogID}`}  >
          <div className=" grid grid-cols-6 md:grid-cols-3 lg:grid-cols-3">
            {/* blog data */}
            <BlogData username={username} title={title} brief={brief} datePublished={datePublished}></BlogData>
            {/* blog image */}
            <BlogImg imageURL={imageURL || ""}></BlogImg>
          </div>
        </Link>

        {/* blog relation subject */}
        <div className="relative col-span-full flex gap-2 pt-7">
          <BlogTags tags={tags}></BlogTags>
          {/* read time  */}
          <div className="text-xs pl-1 pt-[0.3rem] text-[#374151] "> 3 min read</div>
          <LikeButton toggleLike={toggleLike} likeCount={like || 0}></LikeButton>
          <SaveButton toggleSave={toggleSave} saved={saved}></SaveButton>
        </div>
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        layout
        className="fixed bg-[#ececec] z-50 bottom-10 px-3 py-[0.15rem] text-base font-serif text-[#374151] rounded-[0.35rem]"
        onAnimationComplete={() => setVisible(false)}
      >
        Blog Saved Successfully!
      </motion.span>
    </>
  )
})