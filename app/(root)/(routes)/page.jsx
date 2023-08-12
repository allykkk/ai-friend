import Navbar from "@/components/navbar";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();
  console.log(user)
  return <div>Hello {user.firstName}!</div>;
}
