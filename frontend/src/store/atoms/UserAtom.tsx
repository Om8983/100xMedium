import { atom } from "recoil";

export const UserAtom = atom({
    key : "userInfoAtom",
    default : {}
})

export const SearchBar = atom({
    key: "searchAtom",
    default : false
})