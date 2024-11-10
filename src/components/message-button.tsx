import { Chat } from "@mui/icons-material";

interface MessageButtonProps {
    callId: string;
    caller: string;
    service: string;
    startDate: string;
    messageSelected: string
    handleSelectMessage: (callId: string) => void
}

export function MessageButton({ callId, caller, service, startDate, messageSelected, handleSelectMessage }: MessageButtonProps) {
  return (
    <button
        type="button"
        onClick={() => handleSelectMessage(callId)}
        className="hover:shadow-lg transition-all duration-500 ease-in-out"
    >
        <div className="flex rounded-lg bg-white border border-color-gray overflow-hidden">
        <span className={`w-[2.5%] ${messageSelected === callId ? 'bg-red-500': 'bg-white'}`} />

        <div className="flex items-center my-5 ml-5 xs:flex-col w-full">
            <Chat sx={{ fontSize: 40, color: "rgba(0, 108, 121, 0.85)" }} />

            <div className="flex flex-col ml-8 items-start">
            <h1>{caller}</h1>
            <p>{service}</p>
            </div>

            <span className="ml-auto mr-5">00:00</span>
        </div>
        </div>
        
    </button>
  );
}
