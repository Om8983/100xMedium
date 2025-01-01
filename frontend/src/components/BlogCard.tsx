
import { Link, useNavigate } from "react-router-dom"
import { JSONContent } from "@tiptap/react"
import { motion } from "motion/react"
import { useState } from "react"
import axios, { AxiosError } from "axios"
import { BLOGS_BACKEND_URL } from "../config"

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

export const BlogCard = ({ username, title, datePublished, brief, imageURL, blogID, tags }: Prop) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [fill, setFill] = useState(false)
  const [visible, setVisible] = useState(false)
  const [saved] = useState(true)
  const handleSave = async () => {
    try {
      const res = await axios.post(`${BLOGS_BACKEND_URL}/save/${blogID}`, {}, { withCredentials: true })
      if (res.status === 200) {
        setFill(!fill)
        if (res.data.msg === "saved") {
          setVisible(true)
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          alert("Unauthorized User! Please Login Again.")
          navigate('/login')
        } else if (e.response?.status === 404) {
          alert('Non-Existing User! Please SignUp!')
          navigate('/signup')
        } else {
          alert("Unexpected error occured!!")
        }
      }
    }
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
            <div className=" col-span-4 md:col-span-2 lg:col-span-2">
              <div className="flex items-center">
                {/* user img */}
                <div className=" rounded-full w-[1.15rem] h-[1.15rem] lg:w-5 lg:h-5 ">
                  <img className=" h-[1.10rem] w-5" src="user.svg" alt="usersvg" />
                </div>
                {/* userName */}
                <div className="pl-1 font-sans text-xs text-gray-700">{`${username.split(' ').length === 2 ? `${username.split(' ')[0]} ${username.split(' ')[1][0]}.` : username}`}</div>
                {/* small dot */}
                <div className="relative">
                  <span className="text-[#374151] absolute -bottom-2 left-[0.19rem] lg:left-[0.15rem] lg:-bottom-2 ">.</span>
                </div>
                {/* date published */}
                <div className="pl-2 text-xs text-[#687993]">{datePublished}</div>
              </div>

              <div>
                {/* Blog title */}
                <h1 className=" pt-5 text-xl md:text-2xl lg:text-3xl font-[580] font-serif  ">{title}</h1>
                {/* part of blog content */}
                <div className=" pt-4 text-xs md:text-sm lg:text-base font-serif tracking-wide text-[#374151] ">{brief}</div>
              </div>
            </div>

            {/* blog image */}
            <div className="col-span-2 md:col-span-1 bg-[#ececec] self-center ml-3 mt-5  w-[110px] h-[100px] md:w-[120px] lg:w-[170px] lg:h-[110px]  rounded-lg ">
              <img src={
                imageURL ?
                  imageURL :
                  "logo.svg"
              } className="rounded-lg shadow-xl h-full " alt="blogImg" />
            </div>
          </div>
        </Link>
        {/* blog relation subject */}
        <div className="relative col-span-full flex gap-2 pt-7">
          {tags.length > 0 &&
            tags?.map((tag) => {
              return (
                <div key={tag} className="text-xs font-serif px-2 py-1 flex items-center rounded-xl text-center text-[#374151] bg-[#ececec]"> {tag} </div>
              )
            })}
          {/* read time  */}
          <div className="text-xs pl-1 pt-[0.3rem] text-[#374151] "> 3 min read</div>

          <motion.button
            whileHover={{ scale: 1.2 }}
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            onClick={handleSave}
            className="relative cursor-pointer pl-1 self-center outline-none"
          >
            <motion.svg
              style={{ outline: 0 }}
              width="18"
              height="20"
              viewBox="0 0 12 13"
              fill={saved ? "black" : fill === false ? "none" : "black"}
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.69166 1.00018L1 1.00159L1.00205 10.7432L4.82498 6.56741L8.64967 10.7416L8.6482 3.78329"
                stroke="#374151" />
              <path
                d="M10 0V4"
                stroke="#374151" />
              <path
                d="M8 2H12"
                stroke="#374151" />
            </motion.svg>

            {
              hover && fill === false &&
              <motion.span
                animate={{ scale: [0, 0.5, 0.8, 0.9, 1], y: [20, -10, -25, -30, 0] }}
                transition={{ duration: 0.5, times: [0, 0.3, 0.5, 0.8, 1] }}
                layout
                className="absolute bottom-6 -left-12 z-20 rounded-md w-[120px] h-auto p-1 text-center text-[0.55rem] text-[#374151] bg-[#ececec] font-medium">
                Save to Your Favourites
              </motion.span>
            }
          </motion.button>
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2, ease: "easeIn" }}
        className="absolute bg-[#ececec] bottom-10 px-3 py-[0.15rem] text-base font-serif text-[#374151] rounded-[0.35rem]"
        onAnimationComplete={() => setVisible(false)}
      >
        Blog Saved Successfully!
      </motion.span>
    </>
  )
}
