import { Link } from "react-router-dom"

type Prop = {
  username: string
  title: string
  content: string
  datePublished: string
  imageURL?: string
  blogID: string
}

export const BlogCard = ({ username, title, content, datePublished, imageURL, blogID }: Prop) => {
  return (
    <>
      <Link to={`/blog/id/${blogID}`}  >
        <div className=" m-2 cursor-pointer border-2 rounded-2xl backdrop-blur-sm border-black p-3 max-w-[380px] lg:p-4 md:max-w-[600px] lg:max-w-[850px] lg:min-h-[250px] mt-5 shadow-xl">
          <div className=" grid grid-cols-5 md:grid-cols-3  lg:grid-cols-3">
            <div className=" col-span-3 md:col-span-2">
              <div className="flex items-center">
                {/* user img */}
                <div className=" rounded-full w-[1.15rem] h-[1.15rem] lg:w-5 lg:h-5 ">
                  <img className=" h-[1.10rem] w-5" src="user.svg" alt="usersvg" />
                </div>
                {/* userName */}
                <div className="pl-1 font-sans text-xs text-gray-700">{`${username.split(' ').length === 2 ? `${username.split(' ')[0]} ${username.split(' ')[1][0]}.` : username}`}</div>
                {/* small dot */}
                <div className="relative">
                  <span className="text-gray-400 absolute bottom-[0.19rem] left-[0.19rem] lg:left-[0.15rem] lg:bottom-1 ">.</span>
                </div>
                {/* date published */}
                <div className="pl-2 text-xs text-gray-400">{datePublished}</div>
              </div>

              <div>
                {/* Blog title */}
                <h1 className=" pt-5 text-xl lg:text-3xl  font-semibold ">{title}</h1>
                {/* part of blog content */}
                <div className=" pt-4 text-xs lg:text-sm font-[myfont] ">{`${content.slice(0, 150)}...`}</div>
              </div>

              <div className="flex pt-7">
                {/* blog relation subject */}
                <div className="text-xs p-1 rounded-2xl text-center text-gray-700 bg-gray-200 w-[70px] h-[25px]"> Subject </div>
                {/* read time  */}
                <div className="text-xs pl-3 pt-[0.3rem] text-gray-500"> 3 min read</div>
              </div>
            </div>

            {/* blog image */}
            <div className="col-span-2 md:col-span-1 lg:col-span-1 bg-slate-200 self-center ml-2 w-[110px] h-[100px] md:w-[120px] lg:w-[170px] lg:h-[110px] lg:mt-8 ">
              <img src={
                imageURL ?
                  imageURL :
                  "logo.svg"
              } className="rounded-md shadow-xl h-full " alt="blogImg" />
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
