import { Header } from "@/components/header";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header label="Home" />
      {session && <pre>{JSON.stringify(session)}</pre>}
    </>
  );
}
