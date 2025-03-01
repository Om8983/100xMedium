type Prop = {
    tags: string[]
}

export const BlogTags = ({ tags }: Prop) => {

    return (
        <>
            {
                tags.length > 0 &&
                tags?.map((tag) => {
                    return (
                        <div key={tag} className="text-xs font-serif px-2 py-1 flex items-center rounded-xl text-center text-[#374151] bg-[#ececec]"> {tag} </div>
                    )
                })
            }
        </>
    )
}
