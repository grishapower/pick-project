import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components";
import { trpc } from "~/contexts/TRPCProvider";

export const AdminNotificationTab = () => {
  const params = useParams();
  const tournamentId = params!.id as string;

  const { mutateAsync } =
    trpc.admin.sendTournamentUserNotifications.useMutation();
  const [inputText, setInputText] = useState("");
  const [inputTitle, setInputTitle] = useState("");

  const clickBtn = async () => {
    await mutateAsync({ text: inputText, title: inputTitle, tournamentId });

    setInputText("");
    setInputTitle("");
  };

  return (
    <div className="mb-4">
      <div>Title</div>
      <input
        value={inputTitle}
        onChange={({ target }) => setInputTitle(target.value)}
        className="h-8 text-black"
      />

      <div>Text</div>
      <input
        value={inputText}
        onChange={({ target }) => setInputText(target.value)}
        className="h-8 text-black"
      />

      <Button onClick={clickBtn}>Отправить всем участникам пикема</Button>
    </div>
  );
};
