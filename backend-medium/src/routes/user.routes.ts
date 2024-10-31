import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userLoginValidation, userSignupValidation } from "../zod/index.zod";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";
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
    secure: false,
    sameSite: "None",
  });
  setCookie(c, "refreshToken", refreshToken, {
    maxAge: 24 * 60 * 60,
    secure: false,
    sameSite: "None",
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
    secure: false,
    sameSite: "None",
  });
  setCookie(c, "refreshToken", refreshToken, {
    maxAge: 24 * 60 * 60,
    secure: false,
    sameSite: "None",
  });
  console.log(Math.floor(Date.now() / 1000) + 60 * 60);

  // return response
  return c.json({ msg: "User login successfull!!" }, 200);
});

export default router;
