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
  if (allBlog.length === 0) {
    return c.json({ msg: "No blogs are posted" }, 200);
  }

  return c.json(
    {
      msg: "success",
      allBlog,
      nextCursor: allBlog.length === 5 ? allBlog[allBlog.length - 1].id : null,
      hasMore: allBlog.length === parseInt(limit),
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
    const postId = c.req.param("id");
    const authorId = c.get("authorId");
    const result = await prisma.$transaction(async (tsx) => {
      const alreadySaved = await tsx.savedBlogs.findFirst({
        where: {
          postId: postId,
          userId: authorId,
        },
        select: {
          id: true,
        },
      });
      if (alreadySaved) {
        const deleteSavedId = await tsx.savedBlogs.delete({
          where: {
            postId_userId: {
              postId: postId,
              userId: authorId,
            },
          },
        });
        return { msg: "unsaved" };
      } else {
        const createSavedId = await tsx.savedBlogs.create({
          data: {
            userId: authorId,
            postId: postId,
          },
        });
        return { msg: "saved" };
      }
    });
    return c.json({ msg: "success", result }, 200);
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

router.post("/upvote", async (c) => {
  const authorId = c.get("authorId");
  const { prisma } = prismaInstance(c);
  const blogId = c.req.query("blogId");
  try {
    // initially i've created 2 transaction 1 for deleting and other for creating upvote.But to avoid the race conditions, i've bundled them in single transaction & which is also useful to reduce the roundtrips to the database. "tsx" means a single transaction for the whole conditional i.e a single roundtrip to the db server.
    const result = await prisma.$transaction(async (tsx) => {
      const existingLike = await prisma.upvotes.findUnique({
        where: {
          userId_postId: {
            // since we have declare the userId & the postId as unique
            userId: authorId,
            postId: blogId as string,
          },
        },
      });
      if (existingLike) {
        // removing user's upvote from the upvote model for that particular post and then decrementing like

        const deleteUpvoteId = await tsx.upvotes.delete({
          // deletes the user like from the upvotes field of the user.
          where: {
            userId_postId: {
              userId: authorId,
              postId: blogId as string,
            },
          },
        });
        const devote = await tsx.post.update({
          // decrements the likeCount for post by 1
          where: {
            id: blogId,
          },
          data: {
            likeCount: { decrement: 1 },
          },
          select: {
            likeCount: true,
          },
        });

        const data = {
          isLiked: false,
          likeCount: devote.likeCount,
        };
        return data;
      } else {
        // making an entry for the user liked post and incrementing the likeCount by 1 for that post
        const createUpvoteId = await tsx.upvotes.create({
          data: {
            userId: authorId,
            postId: blogId as string,
          },
        });
        const upvote = await tsx.post.update({
          where: {
            id: blogId,
          },
          data: {
            likeCount: { increment: 1 },
          },
          select: {
            likeCount: true,
          },
        });

        const data = {
          isLiked: true,
          likeCount: upvote.likeCount,
        };
        return data;
      }
    });
    return c.json({ msg: "success", result }, 200);
  } catch (e) {
    return c.json({ msg: "Internal Server Issue" }, 500);
  }
});
router.post("/metadata", async (c) => {
  const { prisma } = prismaInstance(c);
  const authorId = c.get("authorId");
  //  is an array of ids seperated in batches
  const { blogId } = await c.req.json();
  const ids = blogId.map((item: { id: string }) => item.id);

  try {
    const metadata = await prisma.post.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: {
        id: true,
        likeCount: true,
        SavedBlogs: {
          where: {
            userId: authorId,
          },
          select: {
            postId: true,
          },
        },
      },
    });
    const blogMetadata = metadata.map((blogdata) => {
      return {
        ...blogdata,
        isSaved: blogdata.SavedBlogs.length >= 1 ? true : false,
      };
    });
    return c.json({ msg: "success", blogMetadata }, 200);
  } catch (e) {
    return c.json({ msg: "Internal Server errror" }, 500);
  }
});
export default router;
