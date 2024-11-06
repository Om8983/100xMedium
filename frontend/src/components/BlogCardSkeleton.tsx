

export const BlogCardSkeleton = () => {
  return (
    <>
        <div className=" cursor-pointer border-2 rounded-2xl backdrop-blur-sm border-black p-3 max-w-[380px] lg:p-4 md:max-w-[600px] lg:max-w-[850px] lg:min-h-[250px] mt-5 shadow-xl">
          <div className=" grid grid-cols-5 md:grid-cols-3 lg:grid-cols-3 animate-pulse">
            <div className=" col-span-3 md:col-span-2">
              <div className="flex items-center">
                {/* user img */}
                <div className=" rounded-full w-[1.15rem] h-[1.15rem] lg:w-5 lg:h-5 bg-orange-100 ">
                </div>
                {/* userName */}
                <div className="ml-1 h-3 w-9 bg-orange-100 "></div>
                {/* date published */}
                <div className="ml-2 w-9 h-3 bg-orange-100"></div>
              </div>

              <div className=" mt-2 flex flex-col gap-2">
                {/* Blog title */}
                <h1 className=" w-28 h-4 bg-orange-100 md:w-[230px] md:h-7"></h1>
                {/* part of blog content */}
                <div className="w-14 h-3 bg-orange-100   hidden md:block md:w-[180px]"></div>
                <div className="w-14 h-3 bg-orange-100  hidden md:block nd:w-[150px]"></div>
                <div className="w-14 h-3 bg-orange-100  hidden md:block"></div>
              </div>

              <div className="flex pt-7">
                {/* blog relation subject */}
                <div className=" p-1 rounded-2xl bg-orange-100 w-[70px] h-[25px]"></div>
                {/* read time  */}
                <div className=" ml-2 w-9 h-3 mt-1 bg-orange-100  "></div>
              </div>
            </div>

            {/* blog image */}
            <div className="col-span-2 md:col-span-1 lg:col-span-1 bg-orange-100 self-center ml-2 w-[110px] h-[100px] md:w-[120px] lg:w-[170px] lg:h-[110px] lg:mt-8 "></div>
          </div>
        </div>
    </>
  )
}
