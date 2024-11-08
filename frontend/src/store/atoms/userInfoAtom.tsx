import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface User {
    username : string
    email : string
    id : string
}

export const UserInfo = atom<Partial<User>>({
    key : "userInfo",
    default : {},
    effects_UNSTABLE:[persistAtom]
})