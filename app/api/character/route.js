import { currentUser } from "@clerk/nextjs";
import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prismaDB = new PrismaClient();

async function isCharacterExists(userId, name, categoryId) {
    const existingCharacter = await prismaDB.character.findFirst({
        where: { name, userId, categoryId }
    })
    return existingCharacter != null;
}

// POST: /api/character
export async function POST(req) {
    try {
        // Await the body of the request
        const body = await req.json();
        const loggedInUser = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        console.log("Current user is " + JSON.stringify(loggedInUser));

        // User is not logged in. Unauthenticated users are not allowed to create new characters.
        if (!loggedInUser || !loggedInUser.id || !loggedInUser.firstName) {
            return new NextResponse("Unauthorized, this user is not logged in", { status: 401 })
        }

        // If any fields are missing, let's notify the user
        if (!src || !name || !description || !instructions || !seed || !categoryId) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        // If the character already exists, let's return an error
        if (await isCharacterExists(loggedInUser.id, name, categoryId)) {
            return new NextResponse("Character with this name already exists for this user in this category", { status: 409 })
        }

        const character = await prismaDB.character.create({
            data: {
                categoryId, 
                userId: loggedInUser.id, 
                userName: loggedInUser.firstName, 
                src, 
                name, 
                description, 
                instructions, 
                seed
            }
        });

        return NextResponse.json(character);

    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}