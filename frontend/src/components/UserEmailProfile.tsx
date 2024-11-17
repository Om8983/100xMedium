
type Props = {
    edit: boolean
    nameVal: string
    emailVal: string
}
export const UserEmailProfile = ({ edit, nameVal, emailVal,  }: Props) => {

    return (
        <>
            <form className="flex flex-col gap-5">
                {/* username */}
                <div className="flex flex-col ">
                    <label htmlFor="usernameBox" className="text-white flex gap-1 font-sans text-sm font-bold pb-1 md:w-[20rem] md:self-center tracking-wider">Username</label>
                    <input
                        id="usernameBox"
                        className="w-full h-7 md:w-[20rem] md:self-center bg-white rounded-md font-medium text-center "
                        value={nameVal}
                        disabled={!edit}
                        />
                </div>
                <div className="relative flex flex-col gap-3 ">
                    {/* user email */}
                    <div className="relative flex flex-col">
                        <label htmlFor="emailInput" className="text-white flex gap-1 md:w-[20rem] md:self-center font-sans text-sm font-bold pb-1 tracking-wider ">Email </label>
                        <input
                            id="emailInput"
                            className="w-full h-7 md:w-[20rem] bg-white rounded-md text-center md:self-center font-medium"
                            value={emailVal}
                            disabled={!edit}
                        />
                    </div>
                </div>
            </form>


        </>
    )
}
