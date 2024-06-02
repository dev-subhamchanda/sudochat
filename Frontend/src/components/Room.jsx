import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast, Toaster } from 'sonner';
import { FaUser, FaCommentAlt, FaPaperPlane } from 'react-icons/fa';

const Room = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('Waiting for other user to join...');

  const socket = io("http://localhost:3000");

  const handleMessageSent = () => {
    if (msg.trim() !== "") {
      console.log(`Sent: ${msg}`);
      socket.emit('sent-msg', msg);
      setMessages(prevMessages => [...prevMessages, { type: 'sent', content: msg }]);
      setMsg("");
    }
  };

  socket.on('chat-established', (data) => {
    console.log(data);
    setStatus("Users Paired");
  });

  useEffect(() => {
    socket.on('get-msg', (data) => {
      setMessages(prevMessages => [...prevMessages, { type: 'received', content: data }]);
      console.log(`Received: ${data}`);
    });
    return () => {
      socket.off('get-msg');
      socket.off('connected');
    };
  }, [socket]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800 p-4">
      <Toaster position='top-center' theme='system' invert/>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg h-[80vh] w-full sm:w-[90vw] md:w-[70vw] lg:w-[50vw] mx-auto my-10 py-6 px-8 flex flex-col">
        <h3 className="font-semibold text-lg text-blue-600 bg-blue-100 rounded-md p-4 flex items-center">
          {status === "Users Paired" && <FaUser className="mr-2" />} {status}
        </h3>
        <div className="flex-1 overflow-y-auto mt-4 read-only">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 p-3 max-w-[70%] rounded-2xl shadow-md relative overflow-hidden break-words ${
                  message.type === 'received' ? 'bg-blue-600 text-white self-start ml-auto' : 'bg-blue-100 text-blue-800 self-end mr-auto'
                }`}
              >
                {message.content}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 mt-4 ">
              <FaCommentAlt className="mx-auto my-10 text-slate-500 opacity-15 text-4xl font-extra1bold text-center" />
              <h3 className='px-2 text-slate-500 opacity-15 text-3xl font-semibold text-center'>No Messages Found</h3>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md w-full sm:w-[90vw] md:w-[70vw] lg:w-[50vw] mx-auto p-4 flex gap-4 items-center">
        <input
          type="text"
          className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner p-4 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg p-4 shadow-md flex items-center"
          onClick={handleMessageSent}
        >
          <FaPaperPlane className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default Room;
