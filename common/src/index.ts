import { z } from "zod";

// user schemas
// this is while user is trying to signup or login
export const userSignUpSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const userInfoUpdateSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
});

// blog schemas
export const blogCreateSchema = z.object({
  title: z.string(),
  content: z.object({
    type: z.literal("doc"),
    content: z.array(z.object({})),
  }),
});

export const blogUpdateSchema = z.object({
  blogId: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
});

// vsriable that will be used by the frontend while passing data
export type SignUpSchema = z.infer<typeof userSignUpSchema>;
export type LoginSchema = z.infer<typeof userLoginSchema>;
export type BlogCreate = z.infer<typeof blogCreateSchema>;
export type BlogUpdate = z.infer<typeof blogUpdateSchema>;
export type UserUpdate = z.infer<typeof userInfoUpdateSchema>;
