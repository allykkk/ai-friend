import { PrismaClient } from "@prisma/client/edge";

// This seems to be the preferred method for maintaining a global prisma instance.
const prismaDB = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaDB;

export default prismaDB