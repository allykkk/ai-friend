import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form Schema
const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  instructions: z
    .string()
    .min(200, { message: "Instructions require at least 200 characters." }),
  seed: z.object({
    userSeed: z
      .string()
      .min(20, { message: "Seed require at least 20 characters." }),
    assistantSeed: z
      .string()
      .min(100, { message: "Seed require at least 200 characters." }),
  }),

  src: z.string().min(1, { message: "Image is required." }),
  categoryId: z.string().min(1, { message: "Category is required." }),
});

const GetResolver = () => {
  return zodResolver(FormSchema);
};

export default GetResolver;
