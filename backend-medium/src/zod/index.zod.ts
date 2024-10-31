import { zValidator } from "@hono/zod-validator";
import {
  userSignUpSchema,
  userLoginSchema,
  blogCreateSchema,
  blogUpdateSchema,
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
