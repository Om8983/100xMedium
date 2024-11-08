import { useNavigate } from "react-router-dom"

type Props = {
    username: string
    email: string
    onClickLogout : () => void
}
export const UserProfileCard = ({ username, email, onClickLogout }: Props) => {
    const navigate = useNavigate();
    return (
        <div className="bg-black h-screen w-screen flex items-center justify-center">

            <div className="absolute rounded-lg bg-brad w-[20rem] h-[30rem] md:w-[30rem] blur-xl  "></div>

            <div className='relative flex '>

                <div className="relative flex flex-col  w-[20rem] h-[30rem] md:w-[30rem] bg-black rounded-lg shadow-2xl">
                    <div className="relative flex justify-center items-center h-[150px] w-full border-b-2 border-white">

                        <span className="absolute w-[6rem] h-[6rem] bg-brad rounded-full blur-xl"></span>
                        {/* need to add a small edit icon to update the image and send to backend */}
                        <img src="/user.svg" className=" relative rounded-full ring-1 bg-gray-300 ring-white w-[6rem] h-[6rem] " alt="usersvg" />

                    </div>
                    <div className="flex justify-between m-3 pt-4 md:justify-evenly ">
                        {/* 3 options edit profile, blogs, saved blogs */}
                        <div className="bg-white tracking-wide text-xs ring-1 border-none outline-none ring-white rounded-md font-bold p-1 w-20 h-6 text-center font-sans ">Edit Profile</div>
                        <div className="bg-white tracking-wide text-xs ring-1 border-none outline-none ring-white rounded-md font-bold p-1 w-20 h-6 text-center font-sans">Blogs</div>
                        <div className="bg-white tracking-wide text-xs ring-1 border-none outline-none ring-white rounded-md font-bold p-1 w-20 h-6 text-center font-sans">Saved</div>
                    </div>
                    <div className="flex flex-col gap-5 m-3 pt-6">
                        <div className="flex flex-col ">
                            <label htmlFor="username" className="text-white font-sans text-sm font-bold pb-1 md:self-center tracking-wider">Username</label>
                            <span id="username" className="w-full h-7 md:w-[20rem] md:self-center bg-white rounded-md text-center ">{username}</span>
                        </div>
                        <div className="flex flex-col ">
                            <label htmlFor="username" className="text-white font-sans text-sm font-bold pb-1 tracking-wider md:self-center">Email</label>
                            <span id="username" className="w-full h-7  md:w-[20rem] bg-white rounded-md text-center md:self-center">{email}</span>
                        </div>
                        <div className="flex justify-around w-full ">

                            <button className="flex  justify-center  items-center space-x-2 mt-2" onClick={() => navigate("/blog")}>
                                <div className="text-white font-medium">Home </div>
                                <span ><img className="w-5 h-5" src="/home.svg" alt="logout" /></span>
                            </button>

                            <div className="flex  justify-center  items-center space-x-2 mt-2" >
                                <button onClick={onClickLogout} className="text-white font-medium ">Log Out </button>
                                <span ><img className="w-5 h-5" src="/logout.svg" alt="logout" /></span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}


// on the dashboard the user svg icon over navlinks must have a pulse animation that would target the user to folow the user profile, and ask to edit the info.
// On user profile there will be a pulse animate to fill the empty user info field including the image.
// From here a backend request would go out that will include updated user profile info
// {
//     username, 
//     imageURL,
//     user Bio  // may be I need to create a bio field for each user in database.
// }