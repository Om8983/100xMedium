import axios, { AxiosError } from "axios";
import { selectorFamily } from "recoil";
import { USERS_BACKEND_URL } from "../../config";



export const userProfile = selectorFamily({
    key  : "userProfileDetails",
    get : (id : string) => async () => {
        try{
            const res = await axios.get(`${USERS_BACKEND_URL}/details?id=${id}`, {withCredentials : true});
            return res.data
        }catch(e){
            if(e instanceof AxiosError){
                if(e.response?.status === 401){
                    alert("User Session Ended! Please Relogin")
                }else{
                    alert("Internal Server Error")
                }
            }
        }
    }
});