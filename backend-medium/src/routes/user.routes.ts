import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userLoginValidation, userSignupValidation } from "../zod/index.zod";
import { decode, sign } from "hono/jwt";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { Cookies } from "../controllers/cookies";
type Bindings = {
  DATABASE_URL: string;
  ACCESSTOKEN_SECRET: string;
  REFRESHTOKEN_SECRET: string;
};
const router = new Hono<{ Bindings: Bindings }>();

router.post("/signup", userSignupValidation, async (c) => {
  // initialize prisma instance
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  //1. introduce zod validation and export data
  const data = c.req.valid("json");
  const { username, email, password } = data;

  // forgot to add the existing user check
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existingUser) {
    return c.json({ msg: "User already exist!" }, 409);
  }
  //2. create hash password for the user
  const saltRounds = 10;
  const hashedpass = await bcrypt.hash(password, saltRounds);

  // 3. create user
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedpass,
    },
    select: { id: true, username: true, email: true },
  });

  //4. promisified set cookies function which needs the user as a parameter
  await Cookies({
    c: c,
    ACCESSTOKEN_SECRET: c.env.ACCESSTOKEN_SECRET,
    REFRESHTOKEN_SECRET: c.env.REFRESHTOKEN_SECRET,
    userData: {
      username: user?.username!,
      email: user?.email!,
      id: user?.id!,
    },
  });

  // 5. send response
  return c.json(
    {
      msg: "User created successfully!!",
      user: {
        id: user.id,
        username: username,
        email: email,
      },
    },
    200
  );
});

router.post("/login", userLoginValidation, async (c) => {
  // initialize prisma instance
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // zod validation
  const data = c.req.valid("json");
  const { email, password } = data;

  // forgot to add the existing user check
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!existingUser) {
    return c.json({ msg: "No user found. Please Signup" }, 409);
  }

  // extract user hashed pass from db and compare using bcrypt
  const user = await prisma.user.findFirst({
    where: { email: email },
    select: { username: true, email: true, id: true, password: true },
  });
  // check for the password validation using bcrypt
  const valid = await bcrypt.compare(password, user?.password ?? "");
  if (!valid) {
    return c.json({ msg: "Incorrect Password" }, 401);
  }

  // promisified set cookies function which needs the user as a parameter
  await Cookies({
    c: c,
    ACCESSTOKEN_SECRET: c.env.ACCESSTOKEN_SECRET,
    REFRESHTOKEN_SECRET: c.env.REFRESHTOKEN_SECRET,
    userData: {
      username: user?.username!,
      email: user?.email!,
      id: user?.id!,
    },
  });

  // return response
  return c.json(
    {
      msg: "User login successfull!!",
      user: {
        username: user?.username,
        email: user?.email,
        id: user?.id,
      },
    },
    200
  );
});

router.post("/logout", async (c) => {
  const accessToken = getCookie(c, "accessToken");
  const refreshToken = getCookie(c, "refreshToken");

  if (accessToken && refreshToken) {
    deleteCookie(c, "accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    deleteCookie(c, "refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
  } else {
    return c.json({ msg: "no cookies existed" });
  }
  return c.json({ msg: "success" });
});

router.get("/authCheck", async (c) => {
  // Initializing Prisma Client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Getting accessToken from cookies
    const accessToken = getCookie(c, "accessToken");

    if (!accessToken) {
      // Getting refreshToken if accessToken is not found
      const refreshToken = getCookie(c, "refreshToken");

      if (!refreshToken) {
        return c.json({ msg: "Access Denied" }, 401);
      }

      // Extracting user id from refreshToken
      try {
        const decoded = decode(refreshToken);
        const { id } = decoded.payload as { id: string };

        // Fetch user from the database
        const user = await prisma.user.findUnique({
          where: { id },
          select: { id: true, username: true, email: true },
        });

        if (!user) {
          return c.json({ msg: "User not found" }, 404);
        }

        // Generate a new access token
        const newAccessToken = await sign(
          {
            id: user.id,
            email: user.email,
            username: user.username,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 15,
          },
          c.env.ACCESSTOKEN_SECRET
        );

        // Set the new access token in cookies
        setCookie(c, "accessToken", newAccessToken, {
          maxAge: 15 * 60,
          secure: true,
          sameSite: "None",
          httpOnly: true,
        });

        return c.json({ msg: "Access approved", user : user }, 200);
      } catch (err) {
        return c.json({ msg: "Invalid refresh token" }, 401);
      }
    } else {
      const decodedData = decode(accessToken)
      const  { username, email, id  } = decodedData.payload
      // If access token is valid, return success message
      return c.json({ msg: "Access approved", user : {username , email , id} }, 200);
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma to free resources
  }
});
export default router;
