import { AvatarSchema, ItemSchema, SkillSchema } from "@/dbSchemas";

export type Categories = "honkai";
export type Tables = "avatar" | "item" | "skill";

export type TableStructs = AvatarSchema | ItemSchema | SkillSchema;
