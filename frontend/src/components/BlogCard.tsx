
import { Link } from "react-router-dom"
import { JSONContent } from "@tiptap/react"

type Prop = {
  username: string
  title: string
  brief: string
  content: JSONContent
  datePublished: string
  imageURL?: string
  blogID: string
  tags: string[]
}

export const BlogCard = ({ username, title, datePublished, brief, imageURL, blogID, tags }: Prop) => {

  return (
    <>
      <Link to={`/blog/id/${blogID}`}  >
        <div className=" m-2 cursor-pointer border-2 rounded-2xl bg-transparent backdrop-blur-lg border-black p-3 w-[400px] lg:p-4 md:w-[500px] lg:w-[700px] lg:max-h-[250px] mt-5 shadow-xl">
          <div className=" grid grid-cols-6 md:grid-cols-3 lg:grid-cols-3">
            <div className=" col-span-4 md:col-span-2 lg:col-span-2">
              <div className="flex items-center">
                {/* user img */}
                <div className=" rounded-full w-[1.15rem] h-[1.15rem] lg:w-5 lg:h-5 ">
                  <img className=" h-[1.10rem] w-5" src="user.svg" alt="usersvg" />
                </div>
                {/* userName */}
                <div className="pl-1 font-sans text-xs text-gray-700">{`${username.split(' ').length === 2 ? `${username.split(' ')[0]} ${username.split(' ')[1][0]}.` : username}`}</div>
                {/* small dot */}
                <div className="relative">
                  <span className="text-[#374151] absolute -bottom-2 left-[0.19rem] lg:left-[0.15rem] lg:-bottom-2 ">.</span>
                </div>
                {/* date published */}
                <div className="pl-2 text-xs text-[#687993]">{datePublished}</div>
              </div>

              <div>
                {/* Blog title */}
                <h1 className=" pt-5 text-xl md:text-2xl lg:text-3xl font-[580] font-serif  ">{title}</h1>
                {/* part of blog content */}
                <div className=" pt-4 text-xs md:text-sm lg:text-base font-serif tracking-wide text-[#374151] ">{brief}</div>
              </div>
            </div>

            {/* blog image */}
            <div className="col-span-2 md:col-span-1 bg-[#ececec] self-center ml-3 mt-5  w-[110px] h-[100px] md:w-[120px] lg:w-[170px] lg:h-[110px]  rounded-lg ">
              <img src={
                imageURL ?
                  imageURL :
                  "logo.svg"
              } className="rounded-lg shadow-xl h-full " alt="blogImg" />
            </div>
            {/* blog relation subject */}
            <div className="col-span-full flex gap-1 pt-7">
              {tags.length > 0 &&
                tags?.map((tag) => {
                  return (
                    <div key={tag} className="text-xs font-serif px-2 py-1 flex items-center rounded-xl text-center text-[#374151] bg-[#ececec]"> {tag} </div>
                  )
                })}
              {/* read time  */}
              <div className="text-xs pl-1 pt-[0.3rem] text-[#374151] "> 3 min read</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
