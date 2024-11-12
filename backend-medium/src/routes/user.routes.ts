import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { userLoginValidation, userSignupValidation } from "../zod/index.zod";
import { decode, sign, verify } from "hono/jwt";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { Cookies } from "../controllers/cookies";
import { generateOTP, totp } from "../controllers/otpAuth";
import { Resend } from "resend";
import { RefreshAccessToken } from "../controllers/access.refresh";
type Bindings = {
  DATABASE_URL: string;
  ACCESSTOKEN_SECRET: string;
  REFRESHTOKEN_SECRET: string;
  API_KEY: string;
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
    select: { id: true, username: true, email: true, verified: true },
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
      verified: user.verified!,
    },
  });

  // 5. send response
  return c.json(
    {
      msg: "User created successfully!!",
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
    select: {
      username: true,
      email: true,
      id: true,
      password: true,
      verified: true,
    },
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
      verified: user?.verified!,
    },
  });

  // return response
  return c.json(
    {
      msg: "User login successfull!!",
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

router.get("/details", async (c) => {
  // 1. Initializing Prisma Client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { id } = c.req.query();

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
        const verified = await verify(refreshToken, c.env.REFRESHTOKEN_SECRET);

        // Fetch user from the database
        const user = await prisma.user.findUnique({
          where: { id: id as string },
          select: { id: true, username: true, email: true, verified: true },
        });

        if (!user) {
          return c.json({ msg: "User not found" }, 404);
        }
        // assigning new accessToken
        await RefreshAccessToken({
          c: c,
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
            verified: user.verified as boolean,
          },
          ACCESSTOKEN_SECRET: c.env.ACCESSTOKEN_SECRET,
        });

        return c.json({ msg: "Access approved", user: user }, 200);
      } catch (err) {
        return c.json({ msg: "Invalid refresh token" }, 401);
      }
    } else {
      try {
        const verifyToken = await verify(accessToken, c.env.ACCESSTOKEN_SECRET);
        if (verifyToken) {
          const user = await prisma.user.findFirst({
            where: {
              id: id,
            },
            select: {
              username: true,
              email: true,
              verified: true,
            },
          });
          return c.json({ success: "true", user: user }, 200);
        }
      } catch (e) {
        return c.json({ msg: "Invalid AccessTOken" }, 401);
      }
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  }
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

        return c.json({ msg: "Access approved", user: user }, 200);
      } catch (err) {
        return c.json({ msg: "Invalid refresh token" }, 401);
      }
    } else {
      const decodedData = await verify(accessToken, c.env.ACCESSTOKEN_SECRET);
      const { id, verified } = decodedData;
      // If access token is valid, return success message
      return c.json({ msg: "Access approved", user: { id : id,verified: verified  } }, 200);
    }c
  } catch (error) {
    console.error("Authentication error:", error);
    return c.json({ msg: "Internal Server Error" }, 500);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma to free resources
  }
});

// RESEND
router.get("/getOtp", async (c) => {
  const resend = new Resend(c.env.API_KEY);
  const { token, seconds } = generateOTP();
  const { data, error } = await resend.emails.send({
    from: "beLog <onboarding@resend.dev>",
    to: ["omwadhi64@gmail.com"], // for now i can only send otp to my own email but as soon as I deploy my frontend to a specific domain i need to add the dns configs to the domain & only then will resend allow me to send mail to other emails
    subject: "hello world",
    html: `<strong>${token} is valid for ${seconds}</strong>`,
  });
  if (error) {
    return c.json(error, 400);
  }
  return c.json({ data, OTP: token });
});

// verify route for otp verification
router.get("/verifyOtp", async (c) => {
  // Initializing Prisma Client
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.query();
  const { OTP, id } = body;
  const delta = totp.validate({ token: OTP, window: 1 }); //returns 0 for success and -1 if wrong otp & null if not found in the window which is considered as invalid

  if (delta !== 0 || delta === null) {
    return c.json({ msg: "Invalid OTP" }, 401);
  }
  if (id) {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        verified: true,
      },
      select: {
        email: true,
        verified: true,
      },
    });

    return c.json(
      { msg: "Otp Verified", email: user.email, verified: user.verified },
      200
    );
  } else {
    return c.json({ msg: "invalid email" }, 404);
  }
});

export default router;
