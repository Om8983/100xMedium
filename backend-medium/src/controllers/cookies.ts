import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { sign } from "hono/jwt";

type User = {
  id: string;
  email: string;
  username: string;
};

type Props = {
  c: Context;
  ACCESSTOKEN_SECRET: string;
  REFRESHTOKEN_SECRET: string;
  userData: User;
};
export const Cookies = async ({
  c,
  ACCESSTOKEN_SECRET,
  REFRESHTOKEN_SECRET,
  userData,
}: Props) => {
  try {
    console.log(ACCESSTOKEN_SECRET, REFRESHTOKEN_SECRET, userData);

    // create access and refresh token and setCookie
    const accessToken = await sign(
      {
        id: userData?.id,
        email: userData?.email,
        username: userData?.username,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 15,
      },
      ACCESSTOKEN_SECRET
    );
    const refreshToken = await sign(
      {
        id: userData?.id,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      REFRESHTOKEN_SECRET
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
  } catch (e) {
    console.log("error while attaching cookies");
  }
};
