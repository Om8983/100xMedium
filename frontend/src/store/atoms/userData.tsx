import axios, { AxiosError } from "axios";
import { selectorFamily } from "recoil";
import { USERS_BACKEND_URL } from "../../config";



export const userProfile = selectorFamily({
    key: "userProfileDetails",
    get: (id: string) => async () => {

        if (!id) return null;
        try {
            const res = await axios.get(`${USERS_BACKEND_URL}/details?id=${id}`, { withCredentials: true });
            if (res.status === 200) {
                return res.data
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 401) {
                    return {
                        data: null,
                        errorStatus: 401
                    };
                } else {
                    return {
                        data: null,
                        errorStatus: e.response?.status
                    }
                }
            }
        }
        return;
    }
});