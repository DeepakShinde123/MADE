import React, { useRef, useState } from "react";
import { Button, Input } from "@heroui/react";
import { SendHorizontalIcon, UploadIcon } from "lucide-react";

function Inputs({ socket, id, name, setMessages }) {
  const [input, setInput] = useState("");
  const inputUpload = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);

    const reader = new FileReader();

    reader.onloadend = function () {
      // Here is the Base64 string
      const base64String = reader.result;

      const msg = {
        type: "image",
        content: base64String,
        user: {
          id: id,
          name: name,
        },
      };

      socket.emit("message", msg);
      setMessages((prevState) => [...prevState, msg]);
    };

    if (file) {
      reader.readAsDataURL(file); // Converts image to base64 URI
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) {
      inputUpload.current.click();
    } else {
      const msg = {
        type: input.startsWith("http") ? "link" : "text",
        content: input,
        user: {
          id: id,
          name: name,
        },
      };

      socket.emit("message", msg);
      setMessages((prevState) => [...prevState, msg]);

      setInput("");
    }
  };

  return (
    <form
      className="absolute bottom-0 left-0 w-full sm:mb-5 flex sm:gap-1"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        label="Enter your message"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
      />

      <input
        type="file"
        name="file"
        ref={inputUpload}
        hidden
        accept="image/png, image/jpeg"
        onChange={handleFileUpload}
      />

      <Button className="h-auto bg-blue-400" type="submit">
        {input ? <SendHorizontalIcon /> : <UploadIcon />}
      </Button>
    </form>
  );
}

export default Inputs;
