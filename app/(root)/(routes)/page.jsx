import CharacterCards from "@/components/character-card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prismaDB from "@/lib/prisma-instance";

export default async function Home() {
  const charactersData = await prismaDB.character.findMany();
  let groupedCharacters = {};

  // Load each character into the grop in which it fits
  charactersData.forEach((charactersDatum) => {
    if (groupedCharacters.hasOwnProperty(charactersDatum.categoryId)) {
      groupedCharacters[charactersDatum.categoryId].push(charactersDatum);
    } else {
      groupedCharacters[charactersDatum.categoryId] = [charactersDatum];
    }
  });

  // TODO: Add "all" into categories somehow...
  const categories = await prismaDB.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <Tabs defaultValue="all" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="all" className="relative">
              All
            </TabsTrigger>

            {categories.map((category) => {
              return (
                <TabsTrigger key={category.id} value={category.name} className="relative">
                  {category.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <TabsContent value="all">
          <div className="mt-6 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Everyone.
            </h2>
            <p className="text-sm text-muted-foreground">
              Your virtual companions. Built by us, befriended by you.
            </p>
          </div>
          <Separator className="my-4" />
          <CharacterCards data={charactersData} />
        </TabsContent>

        {categories.map((category) => {
          const categoryCharacters = charactersData.filter(
            (element) => element.categoryId == category.id
          );
          return (
            <TabsContent key={category.id} value={category.name}>
              <div className="mt-6 space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Your {category.name}s
                </h2>
                <p className="text-sm text-muted-foreground">
                {category.description}
                </p>
              </div>
              <Separator className="my-4" />
              <CharacterCards data={categoryCharacters} />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
