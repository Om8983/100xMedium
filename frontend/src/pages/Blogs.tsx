import { BlogCard } from "../components/BlogCard"
import { useBulkBlog } from "../hooks/bulkBlog";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { useRecoilValue } from "recoil";
import { userLoginAtom } from "../store/atoms/userInfoAtom";
import { UnAuth } from "../components/UnAuth";
import { NavLinks } from "../components/NavBar/NavLinks";

export const Blogs = () => {
  const userLogin = useRecoilValue(userLoginAtom)

  // populating blogs
  const { data, loading } = useBulkBlog();
  if (userLogin === true) {
    if (loading === true) {
      return <div className=" flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
        <NavLinks ></NavLinks>
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
    }
    return <div className=" flex flex-col gap-2 items-center w-screen min-h-screen bg-[url(/paper.png)] bg-fixed bg-no-repeat bg-cover  ">
      <NavLinks />
      {data?.map((blog) => {    // i have made it optional cuz if no blog existed on website then it shouldn't throw error instead should show a message like i did in "/myblogs" route
        return <BlogCard
          key={blog.id}
          username={blog.author.username}
          datePublished={blog.publishedAt}
          title={blog.title} 
          brief={blog.brief}
          content={blog.content}
          blogID={blog.id}
          tags={blog.postTag}
        ></BlogCard>
      })
      }
    </div>
  } else {
    return <UnAuth />
  }
}
