import axios, { AxiosError } from "axios";
import { selectorFamily } from "recoil";
import { BLOGS_BACKEND_URL, USERS_BACKEND_URL } from "../../config";

// all blogs on home page
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



// user blogs on "/myblogs" page
export const UserBlogs = selectorFamily({
    key: "userBlogAtom",
    get: (userId: string) => async () => {
        try {
            const res = await axios.get(`${USERS_BACKEND_URL}/myblogs?id=${userId}`, { withCredentials: true });
            return res.data;

        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 401) {
                    alert("User is Unauthorized")
                } else {
                    alert("Internal Server Error")
                }
            }
        }
    }
})

// user saved blogs
export const UserSavedBlogs = selectorFamily({
    key: "userSavedBlogAtom",
    get: () => async () => {
        try {
            const res = await axios.get(`${BLOGS_BACKEND_URL}/savedBlogs`, { withCredentials: true });
            return res.data;

        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 401) {
                    alert("User is Unauthorized")
                } else {
                    alert("Internal Server Error")
                }
            }
        }
    }
})
