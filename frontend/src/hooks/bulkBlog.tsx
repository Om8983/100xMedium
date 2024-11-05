import axios from "axios"
import { useEffect, useState } from "react"
import { BLOGS_BACKEND_URL } from "../config"

export const useBulkBlog = () => {
    type Blog = {
        id : string 
        title : string
        content : string 
        publishedAt: string 
        author : {
            author_id : string
            username : string
        }
    }
  const [data, setData] = useState<Blog[]>()
    const [loading, setLoading] = useState(true)
  useEffect(() => {
    ( async () => {
        const res = await axios.get(`${BLOGS_BACKEND_URL}/bulk`, {withCredentials : true})
        setData(res.data.blogs)
        setLoading(false)
    })()
    return () => {}
  }, [setData])
  return {data, loading};
}
