import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { BLOGS_BACKEND_URL } from "../../config"
import axios, { AxiosError } from "axios"
import { useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { blogPostMetaData } from "../../store/atoms/blogMetadata"
import { toast } from "sonner"
type Prop = {
    blogId?: string
}
let debounceSaveTimer: NodeJS.Timeout

export const SaveButton = ({ blogId }: Prop) => {

    const [hover, setHover] = useState(false)
    const [saved, setSaved] = useState(false)
    const [visible, setVisible] = useState(false)
    let { id } = useParams()
    
    if (id === undefined) {
        id = blogId
    }
    
    const blogPost = useRecoilValue(blogPostMetaData(id))
    useEffect(() => {
        setSaved(blogPost?.isSaved!)
    }, [blogPost])

    const debounceSave = () => {
        clearTimeout(debounceSaveTimer)
        debounceSaveTimer = setTimeout(async () => {
            try {
                const res = await axios.post(`${BLOGS_BACKEND_URL}/save/${id}`, {}, { withCredentials: true })
                if (res.status === 200) {
                    toast.success("Blog Unsaved!")
                    setSaved(res.data.postSaved)
                }
                // i seperated below conditional cuz on each toggle setVisible was true causing inconsistency. So if only postSaved response is true then only setVisible to true
                if (res.status === 200 && res.data.postSaved) {
                    toast.success("Blog Saved Successfully!")
                    setVisible(true)
                }
            } catch (e) {
                setSaved(false)
                if (e instanceof AxiosError) {
                    if (e.response?.status === 401) {
                        toast.error("User Unauthorized")
                    } else if (e.response?.status === 404) {
                        toast.error("No Such Post Exist!!")
                    } else {
                        toast.error("Internal Server Error!!")
                    }
                }
            }
        }, 800);

    }

    const toggleSave = () => {
        setSaved(!saved)
        debounceSave()
    }
    return (
        <>
            <motion.button
                whileHover={{ scale: 1.2 }}
                onHoverStart={() => setHover(true)}
                onHoverEnd={() => setHover(false)}
                onClick={toggleSave}
                className="relative cursor-pointer pl-1 self-center outline-none"
            >
                <motion.svg
                    style={{ outline: 0 }}
                    width="18"
                    height="20"
                    viewBox="0 0 12 13"
                    fill={saved ? "#8a6842" : "none"}
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M7.69166 1.00018L1 1.00159L1.00205 10.7432L4.82498 6.56741L8.64967 10.7416L8.6482 3.78329"
                        stroke="#8a6842" />
                    <path
                        d="M10 0V4"
                        stroke="#8a6842" />
                    <path
                        d="M8 2H12"
                        stroke="#8a6842" />
                </motion.svg>

                {
                    hover && !saved &&
                    <motion.span
                        animate={{ scale: [0, 0.5, 0.8, 0.9, 1], y: [20, -10, -25, -30, 0] }}
                        transition={{ duration: 0.5, times: [0, 0.3, 0.5, 0.8, 1] }}
                        className="absolute bottom-6 -left-12 z-20 rounded-md w-[120px] h-auto p-1 text-center text-[0.55rem] text-[#374151] bg-[#ececec] font-medium">
                        Save to Your Favourites
                    </motion.span>
                }
            </motion.button>
        </>

    )
}
