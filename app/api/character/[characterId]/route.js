import prismaDB from "@/lib/prisma-instance";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

async function isCharacterExists(characterId) {
    const existingCharacter = await prismaDB.character.findFirst({
        where: { id: characterId }
    })
    return existingCharacter != null;
}


// PATCH: /api/character
export async function PATCH(req, { params }) {
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

        if (!(await isCharacterExists(params.characterId))) {
            return new NextResponse("Cannot patch a character that does not exist", { status: 404 })
        }

        const character = await prismaDB.character.update({
            where: { id: params.characterId, userId: loggedInUser.id },
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

export async function DELETE(req, { params }) {
    try {
        const loggedInUser = await currentUser();

        // User is not logged in. Unauthenticated users are not allowed to create new characters.
        if (!loggedInUser || !loggedInUser.id) {
            return new NextResponse("Unauthorized, this user is not logged in", { status: 401 })
        }

        // If the character doesn't exist, let's return an error
        if (!(await isCharacterExists(params.characterId))) {
            return new NextResponse("Character does not exist, cannot delete", { status: 404 })
        }

        await prismaDB.character.delete({
            where: { id: params.characterId }
        })

        return new NextResponse("OK!", { status: 200 })

    } catch (error) {
        return new NextResponse(error, { status: 500 })
    }
}