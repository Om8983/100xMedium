import { getCookie } from "hono/cookie";
import { RefreshAccessToken } from "./access.refresh";
import { verify } from "hono/jwt";
import { Context } from "hono";
import { prismaInstance } from "../prismaInstance";

export const RefreshLogic = async (c: Context, next: () => Promise<void>) => {
  // Initializing Prisma Client
  const { prisma } = prismaInstance(c);
  const accessToken = getCookie(c, "accessToken");
  if (!accessToken) {
    const refreshToken = getCookie(c, "refreshToken");

    if (!refreshToken) {
      return c.json({ msg: "Access Denied" }, 401);
    }

    // Extracting user id from refreshToken
    try {
      const verified = await verify(refreshToken, c.env.REFRESHTOKEN_SECRET);

      const { id } = verified;

      // Fetch user from the database
      const user = await prisma.user.findUnique({
        where: { id: id as string },
        select: {
          id: true,
          username: true,
          email: true,
          verified: true,
          posts: true,
        },
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

      // return success with blog posts
      return c.json(
        {
          msg: "success",
          user: { username: user?.username, post: user?.posts },
        },
        200
      );
    } catch (err) {
      return c.json({ msg: "Invalid refresh token" }, 401);
    }
  } else {
    await next();
  }
};
