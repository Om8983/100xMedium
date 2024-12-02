import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { BLOGS_BACKEND_URL } from "../config"
import { useResetRecoilState } from "recoil"
import { userLoginAtom } from "../store/atoms/userInfoAtom"
import { JSONContent } from "@tiptap/react"

export const useBulkBlog = () => {
  interface Blog {
    id: string
    title: string
    brief : string
    content: JSONContent
    publishedAt: string
    postTag : string[]
    author: {
      author_id: string
      username: string
    }
  }
  const [data, setData] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true);
  const resetLogin = useResetRecoilState(userLoginAtom);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BLOGS_BACKEND_URL}/bulk`, { withCredentials: true })
        setData(res.data.blogs)
        setLoading(false)
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response?.status === 401) {
            localStorage.clear();
            resetLogin();
            setLoading(false);
          } else {
            localStorage.clear();
            resetLogin();
            setLoading(false);
          }
        }
      }
    })()
    return () => { }
  }, [setData])
  return { data, loading };
}
