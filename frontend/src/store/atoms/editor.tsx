import { atom } from "recoil";
import { JSONContent } from "@tiptap/react";
interface Content {
    title: string
    content: JSONContent
}
export const blogPostData = atom<Content>({
    key: "blogPostAtom",
    default: {
        title: "",
        content: {}
    }
})