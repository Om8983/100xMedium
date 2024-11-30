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
const JSONContentSchema = zod_1.z.lazy(() => zod_1.z.object({
    type: zod_1.z.string().optional(),
    attrs: zod_1.z.record(zod_1.z.any()).optional(),
    content: zod_1.z.array(JSONContentSchema).optional(),
    marks: zod_1.z
        .array(zod_1.z.object({
        type: zod_1.z.string(),
        attrs: zod_1.z.record(zod_1.z.any()).optional(),
        // Optionally allow additional properties in `marks`
        // [z.string()]: z.any(),
    }))
        .optional(),
    text: zod_1.z.string().optional(),
}));
// blog schemas
exports.blogCreateSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: JSONContentSchema,
    tag: zod_1.z.array(zod_1.z.string()),
});
exports.blogUpdateSchema = zod_1.z.object({
    blogId: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional(),
});
