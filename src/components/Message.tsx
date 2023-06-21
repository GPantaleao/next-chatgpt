import { DocumentData } from "firebase/firestore";

interface MessageProps {
  message: Message | DocumentData;
}

export default function Message({ message }: MessageProps) {
  const isChatGPT = message.user.name === "ChatGPT";

  return (
    <div className={`py-5 text-white ${isChatGPT && "bg-openai-600"}`}>
      <div className="flex space-x-8 px-10 max-w-2xl mx-auto">
        <img src={message.user.avatar} alt="Avatar pic" className="h-8 w-8" />
        <p className="pt-1 text-sm break-words whitespace-pre-wrap tracking-wide text-justify leading-relaxed ">{message.text}</p>
      </div>
    </div>
  );
}
