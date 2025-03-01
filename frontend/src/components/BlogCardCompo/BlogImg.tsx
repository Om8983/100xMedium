type Prop = {
    imageURL: string
}
export const BlogImg = ({ imageURL }: Prop) => {
    return (
        <div className="col-span-2 md:col-span-1 bg-[#ececec] self-center ml-3 mt-5  w-[110px] h-[100px] md:w-[120px] lg:w-[170px] lg:h-[110px]  rounded-lg ">
            <img src={
                imageURL ?
                    imageURL :
                    "logo.svg"
            } className="rounded-lg shadow-xl h-full " alt="blogImg" />
        </div>
    )
}
