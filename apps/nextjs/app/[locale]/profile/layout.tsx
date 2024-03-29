import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ProfileHeader } from "~/features/profile/components/ProfileHeader";
import { ProfileNavigation } from "~/features/profile/components/ProfileNavigation";

export default async function ProfileLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <ProfileHeader />

      <ProfileNavigation />

      {children}
    </div>
  );
}
