import CharacterCards from "@/components/character-card";
import prismaDB from "@/lib/prisma-instance";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  const charactersData = await prismaDB.character.findMany({
    where: {
      name: {
        search: undefined
      }
    }
  });

  console.log(charactersData);

  return (
    <div className="h-full p-4 space-y-2">
      <CharacterCards data={charactersData}/>
    </div>
    );
}
