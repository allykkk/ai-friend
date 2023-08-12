"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import GetResolver from "./new-character-form-utils";
import NewCharacterFormUI from "./new-character-form-ui";
import axios from "axios";

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.`;
const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

/**
NewCharacterForm is a pretty complex component. So I divided it into 3 different parts:
    UI - This is the UI part of the component. It has all HTML/CSS related data on it. 
    Utils - Which currently has only the resolver for the form. 
    Main Component - Which should ideally hold only the business logic of our component. This is this file. 
*/

const NewCharacterForm = ({dbDefinitions}) => {

  // This is our form, it may have some default values...
  const form = useForm({
    resolver: GetResolver(),
    defaultValues: {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });
  
  // Get hooks here, use in onSubmit
  const router = useRouter();

  // Our onSubmit handler here
  const onSubmit = async (values) => {
    try {
      // 
      await axios.post("/api/character", values);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(`Failed to submit with status code ${error.response.status} - ${error.response.data}`);
    }

  };

  // Render
  return (
    <NewCharacterFormUI
      form={form}
      onSubmit={onSubmit}
      preamble={PREAMBLE}
      seedChat={SEED_CHAT}
      databaseDefinitions={dbDefinitions}
    />
  );
};

export default NewCharacterForm;
