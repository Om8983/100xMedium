import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const token = atom({
    key: "tokenAtom",
    default: ""
})

export const verifiedEmail = atom({
    key: "verified",
    default: false,
    effects_UNSTABLE: [persistAtom]
})