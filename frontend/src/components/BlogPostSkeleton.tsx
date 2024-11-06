export const BlogPostSkeleton = () => {
    return (

        <div className="grid grid-cols-12 grid-rows-10  h-screen animate-pulse lg:mx-[15rem]">
            <div className="bg-orange-100 col-start-2 col-end-12 h-10 row-start-2   "></div>

            <div className="rounded-full bg-orange-100 w-10 h-10 col-start-2 row-start-3"></div>
            <div className="bg-orange-100 col-start-3 row-start-3 h-5 col-end-7"></div>
            <div className="bg-orange-100 row-start-3 col-start-3 h-4 mt-6 col-end-5"></div>


            <div className="col-start-2 row-start-4 row-end-7 col-end-12 gap-2">
                <div className="bg-orange-100 col-start-2 h-4   "></div>
                <div className="bg-orange-100 col-start-2 h-4 mt-3 "></div>
                <div className="bg-orange-100 col-start-2 h-4 mt-3  "></div>
                <div className="bg-orange-100 col-start-2 h-4 mt-3 w-[150px] "></div>
            </div>
            <div className="col-start-2 row-start-6 row-end-8 col-end-12 gap-2">
                <div className="bg-orange-100 col-start-2 h-4   "></div>
                <div className="bg-orange-100 col-start-2 h-4 mt-3 "></div>
                <div className="bg-orange-100 col-start-2 h-4 mt-3  "></div>
                <div className="bg-orange-100 col-start-2 h-4 mt-3 w-[150px] "></div>
            </div>
            <div className="col-start-2 row-start-8 row-end-10 col-end-12 gap-2">
                <div className="bg-orange-100 col-start-2 h-4   "></div>
                <div className="bg-orange-100 col-start-2 h-4 mt-3 "></div>
                <div className="bg-orange-100 col-start-2 h-4 mt-3  "></div>
                <div className="bg-orange-100 col-start-2 h-4 mt-3 w-[150px] "></div>
            </div>
        </div>

    )
}
