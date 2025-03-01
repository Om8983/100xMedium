import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { BLOGS_BACKEND_URL } from '../config'

export const useMetadata = (ids: any) => {
    const [metadata, setMetadata] = useState<{ id: string, likeCount: number, isSaved: boolean }[]>([])
    const [loadingMetadata, setLoading] = useState<boolean>(true)
    useEffect(() => {
        (async () => {
            try {
                // so the below is supposed to be a get request but since we are sending complex input to the server we have kept it as a post request but its sole purpose is to get the data
                const res = await axios.post(`${BLOGS_BACKEND_URL}/metadata`, { blogId: ids }, { withCredentials: true })
                if (res.status === 200) {
                    setMetadata(res.data.blogMetadata)
                    setLoading(false)
                }
            } catch (e) {
                setLoading(true)
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
    return { metadata, loadingMetadata }
}
