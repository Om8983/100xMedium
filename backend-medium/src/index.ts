import { Hono } from 'hono'
import { cors } from 'hono/cors'
import userRouter from "./routes/user.routes"
import blogRouter from "./routes/blog.routes"
const app = new Hono()
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}))

app.route("api/v1/users",userRouter )
app.route("api/v1/blog",blogRouter )

export default app
