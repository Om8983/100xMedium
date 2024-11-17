```
npm install
npm run dev
```

```
npm run deploy
```

router.put("/updateUser", userUpdateSchema, async (c) => {
  try {
    // 1. Initializing Prisma Client
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    // before all this happens i should validate the user based on the accessToken sent as credentials. If its not valid, send an "invalid token" response to the FE.
    const accessToken = getCookie(c, "accessToken");
    if (!accessToken) {
      return c.json({ msg: "token not received" }, 401);
    }
    const decodedData = await verify(accessToken, c.env.ACCESSTOKEN_SECRET);
    const { id } = decodedData;
    // zod validation
    const data = c.req.valid("json");
    const { username, email } = data;

    // 2. store the user info in an obj since both fields are optional
    type Update = {
      username?: string;
      email?: string;
    };
    const updateInfo = <Update>{};
    if (data.username !== '') updateInfo.username = username;
    if (data.email !== '') updateInfo.email = email;

    // 3. we will update user info
    const updatedInfo = await prisma.user.update({
      where: {
        id: id as string,
      },
      data: {
        username: data.username,
        email: data.email,
      },
      select: {
        username: true,
        email: true,
      },
    });

    // 4. on frontend user will receive infos
    return c.json({ success: "true", user: { updatedInfo } }, 200);
  } catch (e) {
    return c.json({ msg: "tampered token" }, 500);
  }
});
