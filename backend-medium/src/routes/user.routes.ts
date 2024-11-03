import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userLoginValidation, userSignupValidation } from "../zod/index.zod";
import { decode, sign } from "hono/jwt";
import { getCookie, setCookie } from "hono/cookie";
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

  // 4. create acccess and refresh token and setCookie
  const accessToken = await sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
    },
    c.env.ACCESSTOKEN_SECRET
  );
  const refreshToken = await sign(
    {
      id: user.id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    c.env.REFRESHTOKEN_SECRET
  );

  setCookie(c, "accessToken", accessToken, {
    maxAge: 15 * 60,
    secure: true,
    sameSite: "None",
    httpOnly: true,
  });
  setCookie(c, "refreshToken", refreshToken, {
    maxAge: 24 * 60 * 60,
    secure: true,
    sameSite: "None",
    httpOnly: true,
  });

  // 5. send response
  return c.json({ msg: "User created successfully!!" }, 200);
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
  // create access and refresh token and setCookie
  const accessToken = await sign(
    {
      id: user?.id,
      email: user?.email,
      username: user?.username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
    },
    c.env.ACCESSTOKEN_SECRET
  );
  const refreshToken = await sign(
    {
      id: user?.id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    c.env.REFRESHTOKEN_SECRET
  );

  setCookie(c, "accessToken", accessToken, {
    maxAge: 15 * 60,
    secure: true,
    sameSite: "None",
    httpOnly: true,
  });
  setCookie(c, "refreshToken", refreshToken, {
    maxAge: 24 * 60 * 60,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  // return response
  return c.json({ msg: "User login successfull!!" }, 200);
});

router.get("/authCheck", async (c) => {
  //initializing prisma instance
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // getting accessToken
  const accessToken = getCookie(c, "accessToken");
  
  if (!accessToken) {
    //getting refreshtoken
    const refreshToken = getCookie(c, "refreshToken");
    if (!refreshToken) {
      return c.json({msg : "access Denied"}, 401);
    } else {
      // extracting user id from refreshToken
      const decoded = decode(refreshToken);
      type decodedData = {
        id: string;
      };
      const { id } = decoded.payload as decodedData;

      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
      });
      const accessToken = await sign(
        {
          id: user?.id,
          email: user?.email,
          username: user?.username,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 60 * 15,
        },
        c.env.ACCESSTOKEN_SECRET
      );
      setCookie(c, "accessToken", accessToken, {
        maxAge: 15 * 60,
        secure: true,
        sameSite: "None",
        httpOnly: true,
      });
      return c.json({msg: "access approved"}, 200)
    }
  }
  return c.json({msg: "Auth Check Done"})
});

export default router;
