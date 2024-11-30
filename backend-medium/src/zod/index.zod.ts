import { zValidator } from "@hono/zod-validator";
import {
  userSignUpSchema,
  userLoginSchema,
  blogUpdateSchema,
  userInfoUpdateSchema,
  blogCreateSchema,
} from "@om_wadhi/common";
export const userSignupValidation = zValidator(
  "json",
  userSignUpSchema,
  (result, c) => {
    if (!result.success) {
      return c.json({ msg: "Invalid user information" }, 403);
    }
  }
);
export const userLoginValidation = zValidator(
  "json",
  userLoginSchema,
  (result, c) => {
    if (!result.success) {
      return c.json({ msg: "Invalid user information" }, 403);
    }
  }
);

export const userUpdateSchema = zValidator("json", userInfoUpdateSchema, (result, c) => {
  if(!result.success){
    return c.json({msg : "Invalid User Information"}, 403)
  }
})

export const createBlogSchema = zValidator(
  "json",
  blogCreateSchema,
  (result, c) => {
    if (!result.success) {
      return c.json({ msg: "Invalid input/ Missing Input" }, 403);
    }
  }
);

export const updateBlogSchema = zValidator(
  "json",
  blogUpdateSchema,
  (result, c) => {
    if (!result.success) {
      return c.json({ msg: "Invalid input/ Missing Input" }, 403);
    }
  }
);
