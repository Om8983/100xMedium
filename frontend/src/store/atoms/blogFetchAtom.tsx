import axios, { AxiosError } from "axios";
import { selectorFamily } from "recoil";
import { BLOGS_BACKEND_URL, USERS_BACKEND_URL } from "../../config";
import { toast } from "sonner";

// all blogs 
export const AllBlogs = selectorFamily({
    key: "allBlogs",
    get: ({ limit, cursor }: { limit: number, cursor?: string | null }) => async () => {
        try {
            const res = await axios.get(`${BLOGS_BACKEND_URL}/bulk`, { params: cursor ? { limit: limit, cursor: cursor } : { limit: limit }, withCredentials: true })

            if (res.status === 200) {
                return res.data;
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 401) {
                    return {
                        data: null,
                        errorStatus: 401
                    }
                } else {
                    return {
                        data: null,
                        errorStatus: 500
                    }
                }
            }
        }
    }
})

export const BlogPostData = selectorFamily({
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
                    console.error("Unauthorized user")
                    return;
                } else {
                    console.error("internal server error", e);
                    return;
                }
            }
        }
        return;
    }
})



// user blogs on "/myblogs" page
export const UserBlogs = selectorFamily({
    key: "userBlogAtom",
    get: (userId: string) => async () => {
        if (!userId) return null;
        try {
            const res = await axios.get(`${USERS_BACKEND_URL}/myblogs?id=${userId}`, { withCredentials: true });
            return res.data;

        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 401) {
                    toast.error("User is Unauthorized")
                    return;
                } else {
                    toast.error("Internal Server Error")
                    return;
                }
            }
        }
        return;
    }
})

