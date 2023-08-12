import NewCharacterForm from "@/components/new-character-form/new-character-form";
import prismaDB from "@/lib/prisma-instance";

const CharacterIdPage = async ({ params }) => {

    const characterId = params.characterId;

    const categories = await prismaDB.category.findMany();

    // These are fields that are not dependent on the current character. 
    // For now, it's only categories.
    const dbDefinitions = { categories };

    if (characterId === "new") {
        // Show one page
        return (<NewCharacterForm dbDefinitions={dbDefinitions}/>)
    } else {
        // Show other page
        return (<div>
            This is the page for viewing data on character {params.characterId}
        </div>)
    }

}
 
export default CharacterIdPage;