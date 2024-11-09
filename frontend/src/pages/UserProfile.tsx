import { useRecoilState, useRecoilValue } from "recoil"
import { UserProfileCard } from "../components/UserProfileCard"
import { UserInfo, userLoginAtom } from "../store/atoms/userInfoAtom"
import { USERS_BACKEND_URL } from "../config"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

export const UserProfile = () => {
    const userLogin = useRecoilValue(userLoginAtom)
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useRecoilState(UserInfo)

    const handleLogout = async () => {
        try {
            await axios.post(`${USERS_BACKEND_URL}/logout`, {}, { withCredentials: true })
            setUserInfo({})
            alert("User LogOut Success!!")
            navigate("/")
            return;
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 500) {
                    setUserInfo({})
                    navigate("/")
                    return;
                }
            }
        }
    }


    if(userLogin === true){
        return < UserProfileCard onClickLogout={ handleLogout } username={ userInfo.username ?? "" } email={ userInfo.email ?? "" } />
    }else{
        alert("User Session Ended! Please Re-Login")
        navigate("/login")
    }
    return;
}
