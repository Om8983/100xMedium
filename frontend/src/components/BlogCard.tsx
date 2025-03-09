
import React from "react"
import { Link } from "react-router-dom"
import { JSONContent } from "@tiptap/react"
import { motion } from "motion/react"
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
}

// React.memo was used cuz i think motion can cause re-renders and disturb the rendering process, so.....
export const BlogCard = React.memo(({ username, title, datePublished, brief, imageURL, blogID, tags }: Prop) => {

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
          <LikeButton blogID={blogID}></LikeButton>
          <SaveButton blogId={blogID}></SaveButton>
        </div>
      </motion.div>
    </>
  )
})