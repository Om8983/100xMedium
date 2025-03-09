import { atom, selectorFamily } from "recoil";
type Metadata = {
    isSaved: boolean,
    likeCount: number,
    id: string
}[]
export const metaData = atom({
    key: "blogMetaData",
    default: [] as Metadata
})

export const blogPostMetaData = selectorFamily({
    key: "blogPostMetadata",
    get: (blogID) => ({ get }) => {
        const allBlogs = get(metaData)
        const blogPostMetadata = allBlogs?.find(item => item.id === blogID)
        return blogPostMetadata
    }
})