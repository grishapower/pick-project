import { FaqSidebar } from "~/features/faq/components/FaqSidebar";

export default function FaqLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <FaqSidebar />

      <div className="bg-bgSecond w-full rounded-2xl px-6 py-8">{children}</div>
    </div>
  );
}
