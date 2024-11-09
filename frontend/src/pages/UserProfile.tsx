import { useRecoilState } from "recoil"
import { UserProfileCard } from "../components/UserProfileCard"
import { UserInfo, userLoginAtom } from "../store/atoms/userInfoAtom"
import { USERS_BACKEND_URL } from "../config"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { UnAuth } from "../components/UnAuth"

export const UserProfile = () => {
    const [userLogin, setUserLogin] = useRecoilState(userLoginAtom)
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useRecoilState(UserInfo)


    const handleLogout = async () => {
        try {
            await axios.post(`${USERS_BACKEND_URL}/logout`, {}, { withCredentials: true })
            setUserInfo({})
            setUserLogin(false)
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


    if (userLogin === true) {
        return < UserProfileCard onClickLogout={handleLogout} username={userInfo.username ?? ""} email={userInfo.email ?? ""} />
    } else {
        return <UnAuth/>
    }
    return;
}
