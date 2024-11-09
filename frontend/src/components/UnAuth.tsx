import { useNavigate } from 'react-router-dom'

export const UnAuth = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className=" flex h-screen justify-center items-center bg-[#011e2b]">
                <div className="bg-[#0f4c68] flex flex-col p-5 rounded-lg justify-center items-center">
                    <h1 className="text-4xl font-semibold bg-[#0f4c68] text-white rounded-md p-4 font-serif">Uh..Oh..!!! Please Authenticate Yourself!</h1>
                    <button onClick={() => navigate("/login")} className="bg-white font-serif p-2 rounded-md hover:text-white hover:bg-[#011e2b] ring-1 ring-black transition-transform ease-in-out hover:scale-110 "> Re-Login </button>
                </div>
            </div>
        </>
    )
}
