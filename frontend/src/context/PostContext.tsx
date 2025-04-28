import { createContext } from "react";
import { Blog } from "../pages/Post";

export const PostContext = createContext<Blog | undefined>(undefined)

// Just to let you know this is an optional approach you can also check at component level and render a fallback component.

// export default function usePostContext() {
//     const blog = useContext(PostContext)
//     if (blog === undefined) {
//         toast.error("Post Not Found")
//         return
//     }
//     return blog;
// }


// the purpose of this custom hook is, if somehow the value is not provided in the providers or the post actuallly doesn't exist then it might happen that the application would crash and throwing errors. Which also leads to bad user experience. 
// To make sure that undefined blog shouldn't throw any errors we have created a custom hook that make sure that no undefined value is being provided and if does then throws a toast error. 


