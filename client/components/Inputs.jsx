import { Input } from "@heroui/react";
import { useState } from "react";
import React from "react";
import { SendHorizontalIcon, UploadIcon } from "lucide-react";

function Inputs() {
  const [input, setInput] = useState("");

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleSendClick() {
    if (input.trim()) {
      console.log(input);
      setInput("");
    }
  }

  return (
    <div className="absolute bottom-0 left-0 w-full sm:mb-5 flex gap-4 p-4">
      <Input
        type="text"
        label="Enter your message"
        value={input}
        onChange={handleInputChange}
        className="flex-1"
      />
      <input type="file" hidden />
      <button
        onClick={handleSendClick}
        className="h-auto bg-green-500 p-4 rounded-xl flex items-center justify-center"
        aria-label="Send Message"
      >
        {input ? <SendHorizontalIcon size={20} /> : <UploadIcon />}
      </button>
    </div>
  );
}

export default Inputs;