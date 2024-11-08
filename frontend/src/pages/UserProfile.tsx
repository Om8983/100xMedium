import { useRecoilState } from "recoil"
import { UserProfileCard } from "../components/UserProfileCard"
import { UserInfo } from "../store/atoms/userInfoAtom"
import { USERS_BACKEND_URL } from "../config"
import axios, { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"

export const UserProfile = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useRecoilState(UserInfo)

    const handleLogout = async () => {
        try {
            await axios.post(`${USERS_BACKEND_URL}/logout`, {}, { withCredentials: true })
            setUserInfo({})
            alert("User LogOut Success!!")
            navigate('/')
            return;
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response?.status === 500) {
                    console.log("internal server error");
                    setUserInfo({})
                    navigate("/")
                    return;
                }
            }
        }
    }
    
    return (
        <>
                <UserProfileCard onClickLogout={handleLogout} username={userInfo.username ?? ""} email={userInfo.email ?? ""}/>
        </>
    )
}
