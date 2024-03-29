import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const userSteamId = session?.user?.email?.split("@")?.[0];

  if (!session || userSteamId !== process.env.NEXT_PRIVATE_STEAM_ADMIN) {
    redirect("/");
  }

  return <div>{children}</div>;
}
