import { z } from "zod";
export declare const userSignUpSchema: z.ZodObject<{
    email: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    username: string;
    password: string;
}, {
    email: string;
    username: string;
    password: string;
}>;
export declare const userLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const userInfoUpdateSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email?: string | undefined;
    username?: string | undefined;
}, {
    email?: string | undefined;
    username?: string | undefined;
}>;
export declare const blogCreateSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodType<any, z.ZodTypeDef, any>;
    tag: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    title: string;
    tag: string[];
    content?: any;
}, {
    title: string;
    tag: string[];
    content?: any;
}>;
export declare const blogUpdateSchema: z.ZodObject<{
    blogId: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    content?: string | undefined;
    title?: string | undefined;
    blogId?: string | undefined;
}, {
    content?: string | undefined;
    title?: string | undefined;
    blogId?: string | undefined;
}>;
export type SignUpSchema = z.infer<typeof userSignUpSchema>;
export type LoginSchema = z.infer<typeof userLoginSchema>;
export type BlogCreate = z.infer<typeof blogCreateSchema>;
export type BlogUpdate = z.infer<typeof blogUpdateSchema>;
export type UserUpdate = z.infer<typeof userInfoUpdateSchema>;
