import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userId = atom({
    key: "userIdAtom",
    default: "",
    effects_UNSTABLE : [persistAtom]
})

export const userLoginAtom = atom({
    key: "userLoginAtom",
    default: false,
    effects_UNSTABLE: [persistAtom]
})


export const verifiedEmail = atom({
    key: "verified",
    default: false,
    effects_UNSTABLE: [persistAtom]
})