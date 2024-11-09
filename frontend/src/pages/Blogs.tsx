import { BlogCard } from "../components/BlogCard"
import { NavLinks } from "../components/NavLinks"
import { useBulkBlog } from "../hooks/bulkBlog";
import { BlogCardSkeleton } from "../components/BlogCardSkeleton";
import { useRecoilValue } from "recoil";
import { userLoginAtom } from "../store/atoms/userInfoAtom";
import { useNavigate } from "react-router-dom";
import { UnAuth } from "../components/UnAuth";

export const Blogs = () => {
  const userLogin = useRecoilValue(userLoginAtom)
  const navigate = useNavigate();

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
      {data?.map((blog) => {
        return <BlogCard
          key={blog.id}
          username={blog.author.username}
          datePublished={blog.publishedAt}
          title={blog.title}
          content={blog.content}
          blogID={blog.id}
        ></BlogCard>
      })
      }
    </div>
  } else {
   return  <UnAuth/>
  }
}
