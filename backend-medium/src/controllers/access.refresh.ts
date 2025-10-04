import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";

type Props = {
  c: Context;
  user: {
    username: string;
    email: string;
    id: string;
    verified: boolean;
  };
  ACCESSTOKEN_SECRET: string;
};
export const RefreshAccessToken = async ({
  c,
  user,
  ACCESSTOKEN_SECRET,
}: Props) => {
  try {
    // Generate a new access token
    const newAccessToken = await sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        verified: user.verified,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 15,
      },
      ACCESSTOKEN_SECRET
    );

    // Set the new access token in cookies
    setCookie(c, "accessToken", newAccessToken, {
      maxAge: 15 * 60,
      secure: true,
      sameSite: "None",
      httpOnly: true,
    });
  } catch (e) {
    return c.json({ msg: "error while setting cookies" }, 500);
  }
};
