import Image from "next/image";

import { Github, Linkedin, AtSign } from "lucide-react";
import Link from "next/link";

const AboutMe = () => {
  return (
    <div className="h-full p-4  max-w-3xl mx-auto">
      <div className="flex justify-center items-center flex-col space-y-6">
        <Image
          width={150}
          height={150}
          src="/avatar2.png"
          className="border-slate-300 border-2 rounded-full"
        />

        <div className="flex justify-center items-center flex-col space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Hi there!</h2>

          <p className="text-sm text-muted-foreground leading-6">
            Welcome to my corner of the digital world! Here, your journey to
            companionship with a diverse array of AI friends begins. Just
            imagine having insightful conversations, playful banter, and
            thought-provoking discussions with AI personalities that span the
            spectrum. This is where the realms of technology and imagination
            intertwine to offer you a unique and enriching experience.
          </p>
        </div>

        <div className="flex justify-center items-center flex-row space-x-2">
          <Link href="https://www.linkedin.com/in/allyke"><Linkedin/></Link>
          <Link href="https://github.com/allykkk"><Github/></Link>
          <Link href="mailto:ally.appskk@gmail.com"><AtSign/></Link>
        </div>
      </div>
    </div>
  );
};
export default AboutMe;
