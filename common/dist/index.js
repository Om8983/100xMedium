"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogUpdateSchema = exports.blogCreateSchema = exports.userInfoUpdateSchema = exports.userLoginSchema = exports.userSignUpSchema = void 0;
const zod_1 = require("zod");
// user schemas
// this is while user is trying to signup or login
exports.userSignUpSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    username: zod_1.z.string(),
    password: zod_1.z.string().min(8),
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
exports.userInfoUpdateSchema = zod_1.z.object({
    username: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
});
// blog schemas
exports.blogCreateSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.object({
        type: zod_1.z.literal("doc"),
        content: zod_1.z.array(zod_1.z.object({})),
    }),
    tag: zod_1.z.array(zod_1.z.string()),
});
exports.blogUpdateSchema = zod_1.z.object({
    blogId: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
});
