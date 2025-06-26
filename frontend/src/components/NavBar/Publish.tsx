import axios, { AxiosError } from "axios"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import { blogPostData } from "../../store/atoms/editor"
import { BLOGS_BACKEND_URL } from "../../config"
import { AnimatePresence, easeInOut, motion } from "motion/react"
import { toast } from "sonner"

export const Publish = () => {
    const [confirmPost, setConfirmPost] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState<string>("");
    const [brief, setBrief] = useState<string>("")
    const [isEmpty, setEmpty] = useState(false)
    const blogdata = useRecoilValue(blogPostData);
    const publishBlog = async () => {
        try {
            if (blogdata.title.trim().length === 0) {
                setConfirmPost(false)
            } else {
                if (tags.length === 0 || brief.length === 0) {
                    setEmpty(true)
                    return
                }

                const data = {
                    title: blogdata.title,
                    brief: brief,
                    content: blogdata.content,
                    tag: tags
                }
                const res = await axios.post(`${BLOGS_BACKEND_URL}/createBlog`, data, { withCredentials: true })
                // rather make a refetch request on blog publish
                if (res.status === 200) {
                    window.open("https://100x-medium-zo5p.vercel.app/myblogs", "_self")
                }
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                toast.error("Internal Server Error!")
            }
        }
    }

    return (
        <>
            <button className=" px-3 py-1 bg-transparent backdrop-blur-lg shadow-md rounded-xl ring-1 ring-black outline-none text-center text-[#374151] transition duration-300 ease-in-out hover:bg-black hover:text-white  font-serif" onClick={() => setConfirmPost(!confirmPost)}>Publish <i className="bi bi-send text-sm"></i></button>
            <div className={` ${confirmPost ? "transition transform duration-150 ease-in-out scale-100 " : " opacity-0 scale-0"} absolute w-screen h-screen bg-transparent backdrop-blur-lg  right-0 top-0  `} >
                <div className="flex flex-col gap-3 justify-center items-center h-screen md:grid md:grid-cols-4 ">
                    <button className="absolute top-6 right-6 w-8 h-8 transition-transform hover:scale-110" onClick={() => setConfirmPost(!confirmPost)}> <img src="/dropclose.svg" alt="closesvg" /></button>
                    <div className="flex items-center rounded-md text-sm font-serif text-center w-[250px] min-h-[250px] bg-white bg-opacity-50 ring-1 ring-black md:col-span-2 md:mx-auto ">
                        Posting Thumbnail isn't available now.. Sorry for Incovenience
                    </div>
                    <div className="md:col-span-2 items-start">
                        <div className="relative flex flex-col items-start font-serif text-sm md:text-base text-[#374151] min-w-[230px] md:max-w-[300px] ">

                            {/* short brief */}
                            <label htmlFor="aboutBox" className="peer">Brief <i className="bi bi-question-circle-fill hover:text-black"></i></label>
                            <span className="absolute rounded-md text-[#70491c] font-serif font-medium bg-orange-200 px-2 text-start left-14 top-0 w-[11rem] text-xs opacity-0 lg:translate-x-40 peer-hover:opacity-100 peer-hover:translate-x-0 transition duration-300 ease-in-out ">
                                Add a brief for your content to let people have a context.
                            </span>
                            <textarea maxLength={70} className=" mt-[2px] resize-none scroll-m-0 rounded-md outline-none w-full h-[80px] px-2 py-1 text-[#374151] text-sm" onChange={(e) => setBrief(e.target.value)} ></textarea>


                            {/* tags */}
                            <label htmlFor="tagInput" className="md:mt-7 min-w-[180px] max-w-[230px] mt-2 "> Add tag (tags) that relate to your content (max 3).</label>
                            <input type="text" id="tagInput" className=" mt-[2px] rounded-md outline-none w-full px-2 py-1 text-[#374151] " value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Tag" disabled={tags.length === 3} />
                            <button aria-label="Add Tag" className='absolute bottom-1 right-3  w-3 outline-none ' onClick={() => {
                                if (!tags.includes(tag) && tag.trim().length !== 0 && tags.length < 3) {
                                    setTags([...tags, tag])
                                    setTag("")
                                    setEmpty(false)
                                }
                            }}><i className="bi bi-send text-sm"></i></button>
                            {
                                isEmpty &&
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 100, x: 0 }}
                                        exit={{ opacity: 0, x: 100 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: easeInOut
                                        }}
                                        className='text-sm font-serif text-[#ff2a2a] absolute -bottom-6 '> Add atleast a single tag to your blog
                                    </motion.div>
                                </AnimatePresence>
                            }
                        </div>

                        <div className="flex gap-2 mt-3 w-full ">
                            {
                                tags.map((value) => {
                                    return (
                                        <div key={value} className="text-sm font-serif md:mb-2 min-w-5 rounded-xl px-2 py-1 text-center text-[#374151] bg-[#ececec]">
                                            {value}
                                            <button className="w-4 h-3" onClick={() => {
                                                setTags(tags.filter(t => t !== value));
                                            }} >
                                                <i className="bi bi-x"></i>
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <button className="mt-3 px-3 py-1 bg-transparent backdrop-blur-lg shadow-md rounded-xl ring-1 ring-black outline-none text-center text-[#374151] transition duration-300 ease-in-out hover:bg-black hover:text-white  font-serif" onClick={publishBlog}>Publish Post </button>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}


