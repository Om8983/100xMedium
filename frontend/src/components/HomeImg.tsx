type Prop = {
    className : string
}
export const HomeImg = ({className} : Partial<Prop>) => {
    return (
        <div className={`${className} relative hidden lg:block self-center pl-28 `}>
            <div className="absolute bg-transparent border-2 border-black rounded-3xl border-t-0 border-l-0 lg:w-[450px] lg:h-[300px] ml-2 mt-2 "></div>
            <div className="w-[450px] h-[300px] bg-white bg-opacity-70 border-2 border-black rounded-3xl" >
                <div className="flex justify-between  border-b-2 border-black pt-3">
                    <div className=" font-[myfont] tracking-wider pl-4 text-2xl">
                        Henri Matisse
                    </div>

                    <div className="flex gap-1 pr-6 pt-3">
                        <span className=" w-2 h-2 rounded-full bg-black"></span>
                        <span className=" w-2 h-2 rounded-full bg-black"></span>
                        <span className=" w-2 h-2 rounded-full bg-black"></span>
                    </div>
                </div>
                <div className=" grid grid-cols-3 ">
                    <div className="col-span-2 text-2xl font-[myfont] pt-20 pl-3 font-semibold  ">
                        Don't wait for inspiration, it comes while working
                        <p className="text-xs text-gray-400 pt-3"> - French Painter, Prominent Figure In Modern Art</p>
                    </div>
                    <div className="pt-16 pl-6 " >
                        <img src="https://www.henrimatisse.org/assets/img/henri-matisse.jpg" className="w-[110px] h-[110px] border-2 border-black rounded-3xl " alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
