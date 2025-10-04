import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import axios from "axios";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { decode, sign } from "hono/jwt";
import { Cookies } from "../controllers/cookies";

const router = new Hono<{
  Bindings: {
    ACCESSTOKEN_SECRET: string;
    REFRESHTOKEN_SECRET: string;
    DATABASE_URL: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
  };
}>();

router.get("/google", async (c) => {
  const redirect_uri =
    "https://backend-medium.lostboybegining.workers.dev/auth/redirect";
  const scope = "openid email profile";
  const response_type = "code";
  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${c.env.CLIENT_ID}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}`;
  return c.redirect(authUrl);
});

router.get("/redirect", async (c) => {
  const code = c.req.query("code");
  const redirect_uri =
    "https://backend-medium.lostboybegining.workers.dev/auth/redirect";
  const token_url = "https://oauth2.googleapis.com/token";
  const params = {
    code: code,
    client_id: c.env.CLIENT_ID,
    client_secret: c.env.CLIENT_SECRET,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  };

  // initialize prisma instance
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const tokenResponse = await axios.post(token_url, params);
    const tokens = tokenResponse.data.id_token;
    type UserData = {
      sub: string;
      email: string;
      name: string;
      picture?: string;
    };
    const decoded = decode(tokens);
    const { sub, email, name, picture } = decoded.payload as UserData;

    // finding existing user with same email.. if yes then below else will execute
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // if no user with same email then create one
    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          google_id: sub,
          email: email,
          username: name,
        },
        select: {
          google_id: true,
          email: true,
          username: true,
          id: true,
          verified: true,
        },
      });

      // create acccess and refresh token and setCookie
      // promisified cookie function to assign cookies
      await Cookies({
        c: c,
        ACCESSTOKEN_SECRET: c.env.ACCESSTOKEN_SECRET,
        REFRESHTOKEN_SECRET: c.env.REFRESHTOKEN_SECRET,
        userData: {
          username: newUser?.username!,
          email: newUser?.email!,
          id: newUser?.id!,
          verified: newUser?.verified!,
        },
      });
      return c.json({ msg: "User Signup Success" }, 200);
    } else {
      // if user with same email then assign cookies
      // promisified function to setCookies
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

      c.json({ msg: "User Login Success" }, 200);
    }
  } catch (e) {
    // if any error occurs while decoding token or accessing token
    return c.json({ msg: "error occured" }, 500);
  } finally {
    // finally redirect to blog pagec
    return c.redirect("http://localhost:5173/protected");
  }
});

export default router;
