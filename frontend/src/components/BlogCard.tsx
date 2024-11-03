export const BlogCard = () => {
  return (
    <>

      <div className=" border-b-2 p-3 lg:p-4 md:w-[600px] lg:w-[850px] lg:h-[250px] ">
        <div className=" grid grid-cols-5 md:grid-cols-3  lg:grid-cols-3">
          <div className=" col-span-3 md:col-span-2">
            <div className="flex">
              {/* user img */}
              <div className=" rounded-full bg-gray-300 w-[1.15rem] h-[1.15rem] lg:w-5 lg:h-5 ">
                <img className=" h-[1.10rem] w-5" src="user.svg" alt="usersvg" />
              </div>
              {/* userName */}
              <div className="pl-3 font-sans text-xs  text-gray-700">Om W.</div>
              {/* small dot */}
                <div className="relative">
                <span className="text-gray-400 absolute bottom-[0.19rem] left-[0.19rem] lg:left-[0.15rem] lg:bottom-1 ">.</span>
                </div>
              {/* date published */}
              <div className="pl-2 text-xs text-gray-400">  3 Feb 2024</div>
            </div>

            <div>
              {/* Blog title */}
              <h1 className=" pt-5 text-xl lg:text-3xl  font-semibold ">Title of the blog</h1>
              {/* part of blog content */}
              <div className=" pt-4 text-xs lg:text-sm font-serif ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error corporis consequuntur aliquam saepe, aspernatur sint quam at ratione! Nam ab unde aspernatur possimus aliquam repellendus...</div>
            </div>

            <div className="flex pt-7">
              {/* blog relation subject */}
              <div className="text-xs p-1 rounded-2xl text-center text-gray-700 bg-gray-200 w-[70px] h-[25px]"> Subject </div>
              {/* read time  */}
              <div className="text-xs pl-3 pt-[0.3rem] text-gray-500"> 3 min read</div>
            </div>
          </div>

          {/* blog image */}
          <div className="rounded-md col-span-2 md:col-span-1 lg:col-span-1 bg-slate-200 self-center ml-2 w-[110px] h-[100px] md:w-[120px] lg:w-[170px] lg:h-[120px] "></div>
        </div>
      </div>
      {/* <div className="  h-[0.1rem] bg-gray-200 w-full  lg:w-[850px] "></div> */}
    </>
  )
}
