import { useEffect, useState, useRef } from "react";
import useWebSocket from "react-use-websocket"; 
function App() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(""); 
  const { sendMessage, lastMessage } = useWebSocket("ws://127.0.0.1:8000/chatroom/", {
    onOpen: () => {
      const userName = prompt("Kullanıcı adınızı girin:");
      if (userName) {
        setUsername(userName);
        sendMessage(userName);
      }
    },
  }); 
  useEffect(() => { 
    if (lastMessage !== null) {
      const incomingMessage = lastMessage.data;
       
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: incomingMessage, sender: "other" },
      ]); 
    }
  }, [lastMessage]); 
  const submitMessage = (e) => {
    e.preventDefault();
    if (text === "") {
      alert("Herhangi bir metin yazmadınız");
      return;
    } 
    setMessages((prevMessages) => [
      ...prevMessages,
      { text, sender: "me", username },
    ]); 
    sendMessage(text);
    setText("");
  }; 
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); 
  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 shadow-lg flex items-center justify-center">
        <span className="text-4xl text-white font-bold">Chat Room</span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-4 text-lg rounded-lg shadow-lg ${
                  message.sender === "me" ? "bg-indigo-600 text-white" : "bg-gray-300 text-black"
                }`}
              >
                <div className="text-xs font-semibold">{message.username}</div>
                <div>{message.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <form className="p-6 bg-gray-900" onSubmit={submitMessage}>
        <input
          type="text"
          placeholder="Mesajınızı buraya yazın..."
          className="w-full p-4 text-lg text-white bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </form>
    </div>
  );
}

export default App;
