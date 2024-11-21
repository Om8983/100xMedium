import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { createBlogSchema, updateBlogSchema } from "../zod/index.zod";
import { getCookie } from "hono/cookie";
import { decode, verify } from "hono/jwt";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    ACCESSTOKEN_SECRET: string;
  };
  Variables: {
    authorId: string;
  };
}>();

// creating middleware to extract user id to store the blog related to that user
router.use("*", async (c, next) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const token = getCookie(c, "accessToken");
    const user = await verify(token ?? "", c.env.ACCESSTOKEN_SECRET);
    c.set("authorId", user.id as string);
    await next();
  } catch (e) {
    return c.json({ msg: "Token expired. Please Login" }, 401);
  }
});

router.post("/createBlog", createBlogSchema, async (c) => {
  const authorId = c.get("authorId");
  // initializing prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // zod validation for user schema
  const data = c.req.valid("json");
  const { title, content } = data;

  // creating new post
  const blog = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author_id: authorId,
      publishedAt: new Date().toDateString(),
    },
    select: {
      id: true,
      title: true,
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
  return c.json({ msg: "hello created", blogs: { blog } }, 200);
});

// to update
router.put("/updateBlog", updateBlogSchema, async (c) => {
  const authorId = c.get("authorId");
  // initializing prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // validating data
  const data = c.req.valid("json");

  // lets create a dataObject that contains only the user updated data field
  type Update = {
    title?: string;
    content?: string;
  };

  const updateBlogObj: Update = {};
  if (data.title) updateBlogObj.title = data.title;
  if (data.content) updateBlogObj.content = data.content;

  await prisma.post.update({
    where: {
      id: data.blogId,
      author_id: authorId,
    },
    data: {
      title: data.title,
      content: data.content,
    },
  });

  return c.json({ msg: "Blog updated successfully " });
});

// return a specific blog from the database
router.get("/id/:id", async (c) => {
  // initializing prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  // getting blog id
  const blogId = c.req.param("id");
  // creating new post
  const blog = await prisma.post.findUnique({
    where: {
      id: blogId,
    },
    select: {
      title: true,
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
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // getting all the blogs for home screen
  const allBlog = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      publishedAt: true,
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  if (allBlog.length === 0) {
    return c.json({ msg: "No blogs are posted" }, 200);
  }
  return c.json({ blogs: allBlog }, 200);
});

router.get("/searchBlog", async (c) => {
  // initializing prisma client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

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
export default router;
