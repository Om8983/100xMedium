import axios from "axios"
import Cookies from "js-cookie"

export const Blogs = () => {

    const getCook = async () => {
        const access = document.cookie
        console.log(access);
        
        const refresh = Cookies.get("refreshToken")
        console.log(refresh);
        
    }
    const handler = async () => {
        await axios.get("http://localhost:8787/api/v1/blog/blah", {withCredentials : true})
    }
  return (
    <div>
        <button onClick={getCook}>Get Cookies</button>
            <button onClick={handler}>send req</button>
    </div>
  )
}
