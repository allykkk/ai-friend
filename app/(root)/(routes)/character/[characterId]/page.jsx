import NewCharacterForm from "@/components/new-character-form/new-character-form";
import prismaDB from "@/lib/prisma-instance";

const CharacterIdPage = async ({ params }) => {
  const characterId = params.characterId;

  const categories = await prismaDB.category.findMany();

  // These are fields that are not dependent on the current character.
  // For now, it's only categories.
  const dbDefinitions = { categories };
  let character;

  if (characterId === "new") {
    character = null;
  } else {
    character = await prismaDB.character.findUnique({
      where: {
        id: characterId,
      },
    });
  }

  return (
    <NewCharacterForm dbDefinitions={dbDefinitions} character={character} />
  );
};

export default CharacterIdPage;
