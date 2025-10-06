import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { USERS_BACKEND_URL } from "../../config"
import { toast } from "sonner"

type Stats = {
    Followers: string;
    Following: string;
    posts: string
}

export const ProfileStats = () => {
    const [stats, setStats] = useState<Stats>()
    console.log("hik", stats)
    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`${USERS_BACKEND_URL}/profile/stats`, { withCredentials: true })
                if (res.status === 200) {
                    const data = res.data?.followerCount[0]?._count
                    console.log(data)
                    setStats(data)
                }
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.status === 401) {
                        toast.error("User Unauthorized!")
                        return;
                    }
                    else {
                        toast.error("Internal Server Error!! ")
                        return
                    }
                }
            }
        })()
    }, [])
    return (
        <div className="flex gap-10">
            <div className="flex flex-col text-center">
                <span className="text-xl font-semibold">{stats?.Followers}</span>
                <span >Followers</span>
            </div>
            <div className="flex flex-col text-center">
                <span className="text-xl font-semibold">{stats?.Following}</span>
                <span>Following</span>
            </div>
            <div className="flex flex-col text-center">
                <span className="text-xl font-semibold">{stats?.posts}</span>
                <span>Posts</span>
            </div>
        </div>
    )
}
