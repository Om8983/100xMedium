
type Props = {
    edit: boolean
    nameVal: string 
    emailVal: string 
    setOnChange : (field: string, changedVal:string) => void;
}
export const UserEmailProfile = ({ edit, nameVal, emailVal, setOnChange }: Props) => {

    return (
        <>
            <div className="flex flex-col gap-5 mt-5 md:mt-6">
                {/* username */}
                <div className="flex flex-col gap-[0.05rem]">
                    <label htmlFor="emailInp" className=" text-base font-serif font-medium lg:text-lg " >Username</label>
                    <input id="emailInp" type="text" className=" w-[14rem] p-1 rounded-md bg-orange-50 outline-none font-medium font-serif text-sm text-center lg:text-base lg:w-[16rem] " value={nameVal} disabled={!edit}
                    onChange={(e) => setOnChange("username", e.target.value) }
                    />
                </div>

                {/* email */}
                <div className="flex flex-col gap-[0.05rem] ">
                    <label htmlFor="emailInp" className=" text-base font-serif font-medium lg:text-lg  " >Email</label>
                    <input id="emailInp" type="text" className=" w-[14rem] p-1 rounded-md bg-orange-50 outline-none font-medium font-serif text-sm text-center lg:text-base lg:w-[16rem]" value={emailVal} disabled={!edit} 
                    onChange={(e) => setOnChange("email", e.target.value)}
                    />
                </div>
            </div>
        </>
    )
}
