import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface User {
    username : string
    email : string
    userId : string
}

export const UserInfo = atom<Partial<User>>({
    key : "userInfo",
    default : {},
    effects_UNSTABLE:[persistAtom]
})


export const userLoginAtom = atom({
    key : "userLoginAtom",
    default : false,
    effects_UNSTABLE : [persistAtom]
})
