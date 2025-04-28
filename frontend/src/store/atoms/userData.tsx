import axios, { AxiosError } from "axios";
import { selectorFamily } from "recoil";
import { USERS_BACKEND_URL } from "../../config";

// to remove id from the query as we can directly access the userId from the accessToken we receive

// i have made the followers, following and the post count in a separate route as these number would be dynamic/
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