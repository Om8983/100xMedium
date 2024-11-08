import axios, { AxiosError } from "axios";
import { selectorFamily } from "recoil";
import { BLOGS_BACKEND_URL } from "../../config";
// let me clear you when should you use recoil 
// as we know recoil is a state management library 

export const BlogPostData =  selectorFamily({
        key: "blogPost/default",
        get: (id: string) => async () => {
            try {
                const res = await axios.get(`${BLOGS_BACKEND_URL}/id/${id}`, { withCredentials: true })
                if (res.status === 200) {
                    return res.data;
                }
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.status === 401) {
                        console.error("Unauthorized user", e)
                        return
                    } else {
                        console.error("internal server error", e);
                        return
                    }
                }
            }
            return;
        }
    })
