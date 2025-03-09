import axios, { AxiosError } from 'axios'
import { useEffect } from 'react'
import { BLOGS_BACKEND_URL } from '../config'
import { useSetRecoilState } from 'recoil'
import { metaData } from '../store/atoms/blogMetadata'

export const useMetadata = (ids: any) => {
    const setBlogMeta = useSetRecoilState(metaData)
    useEffect(() => {
        (async () => {
            try {
                // so the below is supposed to be a get request but since we are sending complex input to the server we have kept it as a post request but its sole purpose is to get the data
                const res = await axios.post(`${BLOGS_BACKEND_URL}/metadata`, { blogId: ids }, { withCredentials: true })
                if (res.status === 200) {
                    setBlogMeta(res.data.blogMetadata)
                }
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.status === 401) {
                        // alert("User Unauth")
                        return
                    } else {
                        // alert("Internal Server Issue")
                        return
                    }
                }
            }
        })()
        return () => { }
    }, [ids])
    return {}
}
