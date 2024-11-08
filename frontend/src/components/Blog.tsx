type Blog = {
    username: string
    // userId : string    onclick userimage following to backend req that sends user info and loads a "userProfile for other users" component 
    title: string
    content: string
    publishedAt: string
    imageURL?: string
}
export const Blog = ({ username, title, content, publishedAt, imageURL }: Blog) => {
    return (
        <div className="flex md:mx-10 lg:justify-center lg:mx-[15rem] ">
            <div className="flex flex-col justify-start mx-6 mt-12 gap-3">
                {/* title of the blog */}
                <div className=" text-3xl font-bold md:text-4xl lg:text-5xl font-[boy]  ">
                    {title}
                </div>

                {/* author image/svg */}
                <div className="flex items-center mt-2 lg:mt-6">
                    {
                        imageURL === null ?
                            <div className="flex">
                                <img className="w-10 h-10 " src="/user.svg" alt="authorsvg" />
                            </div>
                            :
                            <div>
                                <img src={imageURL} alt="authorImg" />
                            </div>
                    }
                    <div className="flex flex-col pl-2">
                        <div className=" font-semibold text-md font-[myfont] lg:text-lg " >
                            {username}
                        </div>
                        <div className="text-slate-500 text-sm font-[boy`] ">
                            {publishedAt}
                        </div>
                    </div>
                </div>

                {/* content of the blog */}
                <div className=" mt-5 font-base text-[#242424]  ">
                    {content}
                </div>
            </div>
        </div>
    )
}
