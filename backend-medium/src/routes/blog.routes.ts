import { Hono } from "hono";
import { createBlogSchema, updateBlogSchema } from "../zod/index.zod";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { prismaInstance } from "../prismaInstance";
import { RefreshAccessToken } from "../controllers/access.refresh";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    ACCESSTOKEN_SECRET: string;
    REFRESHTOKEN_SECRET: string;
  };
  Variables: {
    authorId: string;
  };
}>();

// creating middleware to extract user id to store the blog related to that user
router.use("*", async (c, next) => {
  const { prisma } = prismaInstance(c);
  try {
    const accessToken = getCookie(c, "accessToken");
    if (!accessToken) {
      // refresh token logic
      const refreshToken = getCookie(c, "refreshToken");
      if (!refreshToken) {
        return c.json({ msg: "Access Denied" }, 401);
      }
      try {
        const verified = await verify(refreshToken, c.env.REFRESHTOKEN_SECRET);
        const { id } = verified;

        // Fetch user from the database
        const user = await prisma.user.findUnique({
          where: { id: id as string },
          select: { id: true, username: true, email: true, verified: true },
        });

        if (!user) {
          return c.json({ msg: "User not found" }, 404);
        }
        // assigning new accessToken
        RefreshAccessToken({
          c,
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
            verified: user.verified as boolean,
          },
          ACCESSTOKEN_SECRET: c.env.ACCESSTOKEN_SECRET,
        });
        c.set("authorId", user.id);
        await next();
      } catch (e) {
        return c.json({ msg: "Invalid refresh token" }, 401);
      }
    } else {
      const user = await verify(accessToken, c.env.ACCESSTOKEN_SECRET);
      c.set("authorId", user.id as string);
      await next();
    }
  } catch (e) {
    return c.json({ msg: "Token expired. Please Login" }, 401);
  }
});

router.post("/createBlog", createBlogSchema, async (c) => {
  const authorId = c.get("authorId");
  // initializing prisma client
  const { prisma } = prismaInstance(c);

  // zod validation for user schema
  const data = c.req.valid("json");
  const { title, content, brief, tag } = data;

  // creating new post
  const blog = await prisma.post.create({
    data: {
      title: title,
      content: content,
      brief: brief,
      author_id: authorId,
      postTag: tag,
      publishedAt: new Date().toDateString(),
    },
    select: {
      id: true,
      title: true,
      brief: true,
      content: true,
      author: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      publishedAt: true,
    },
  });
  // on success message
  return c.json({ msg: "success", blogs: { blog } }, 200);
});

// to update
router.put("/updateBlog", updateBlogSchema, async (c) => {
  const authorId = c.get("authorId");
  const { prisma } = prismaInstance(c);

  // validating data
  const data = c.req.valid("json");

  // lets create a dataObject that contains only the user updated data field
  type Update = {
    title?: string;
    brief?: string;
    content?: string;
  };

  const updateBlogObj: Update = {};
  if (data.title) updateBlogObj.title = data.title;
  if (data.content) updateBlogObj.content = data.content;
  if (data.brief) updateBlogObj.brief = data.brief;
  await prisma.post.update({
    where: {
      id: data.blogId,
      author_id: authorId,
    },
    data: {
      title: data.title,
      content: data.content,
      brief: data.brief,
    },
  });

  return c.json({ msg: "Blog updated successfully " });
});

// return a specific blog from the database
router.get("/id/:id", async (c) => {
  // initializing prisma client
  const { prisma } = prismaInstance(c);
  // getting blog id
  const blogId = c.req.param("id");
  // creating new post
  const blog = await prisma.post.findUnique({
    where: {
      id: blogId,
    },
    select: {
      title: true,
      brief: true,
      content: true,
      publishedAt: true,
      author: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });
  // on success message
  return c.json({ blog: blog }, 200);
});

// populate all blogs
router.get("/bulk", async (c) => {
  // initializing prisma client
  const { prisma } = prismaInstance(c);
  const userId = c.get("authorId");
  const { cursor, limit = "5" } = c.req.query();
  const query = {
    take: parseInt(limit),
    select: {
      id: true,
      title: true,
      brief: true,
      content: true,
      publishedAt: true,
      postTag: true,
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      SavedBlogs: {
        where: { userId: userId },
        select: {
          postId: true,
        },
      },
    },
  };
  const cursorQuery = {
    take: parseInt(limit),
    skip: 1,
    cursor: {
      id: cursor,
    },
    select: {
      id: true,
      title: true,
      brief: true,
      content: true,
      publishedAt: true,
      postTag: true,
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      SavedBlogs: {
        where: { userId: userId },
        select: {
          postId: true,
        },
      },
    },
  };
  // getting all the blogs for home screen
  // using cursor-based pagination for quick and efficient fetches.
  // read Readme.md to know more about cursor based pagination and why and how is it used here.
  const allBlog = await prisma.post.findMany(cursor ? cursorQuery : query);
  const blogs = allBlog.map((blog) => {
    return {
      ...blog,
      isSaved: blog.SavedBlogs.length > 0 ? true : false,
    };
  });
  if (blogs.length === 0) {
    return c.json({ msg: "No blogs are posted" }, 200);
  }

  return c.json(
    {
      msg: "success",
      blogs,
      nextCursor: blogs.length === 5 ? blogs[blogs.length - 1].id : null,
      hasMore: blogs.length === parseInt(limit),
    },
    200
  );
});

router.get("/searchBlog", async (c) => {
  // initializing prisma client
  const { prisma } = prismaInstance(c);

  try {
    const { search } = c.req.query();
    const blog = await prisma.post.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
    return c.json({ msg: "success", blog });
  } catch (e) {
    return c.json({ msg: "Internal server error" }, 500);
  }
});

//saving blogs
router.post("/save/:id", async (c) => {
  try {
    const { prisma } = prismaInstance(c);
    const id = c.req.param("id");
    const authorId = c.get("authorId");
    const alreadySaved = await prisma.savedBlogs.findFirst({
      where: {
        postId: id,
      },
      select: {
        id: true,
      },
    });
    if (alreadySaved) {
      const remove = await prisma.savedBlogs.delete({
        where: {
          id: alreadySaved.id,
        },
      });
      return c.json({ msg: "unsaved" }, 200);
    }
    const save = await prisma.savedBlogs.create({
      data: {
        userId: authorId,
        postId: id,
      },
    });
    return c.json({ msg: "saved" }, 200);
  } catch (e) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
});

// getting saved blogs by the user
router.get("/savedBlogs", async (c) => {
  try {
    const { prisma } = prismaInstance(c);
    const userId = c.get("authorId");

    const savedBlogs = await prisma.savedBlogs.findMany({
      where: {
        userId: userId,
      },
      select: {
        post: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return c.json({ msg: "success", savedBlogs }, 200);
  } catch (e) {
    return c.json({ msg: "Internal Server Error" }, 500);
  }
});
export default router;
