import { Hono } from "hono";
import { cors } from "hono/cors";
import userRouter from "./routes/user.routes";
import blogRouter from "./routes/blog.routes";
import googleRoute from "./routes/google-auth";
const app = new Hono<{
  Bindings: {
    FRONTEND_URL: string;
  };
}>();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://100x-medium.vercel.app"],
    credentials: true,
  })
);

app.route("api/v1/users", userRouter);
app.route("api/v1/blog", blogRouter);
app.route("/auth", googleRoute);

export default app;
// "https://100x-medium.vercel.app/protected"