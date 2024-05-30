import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Room = () => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);

  // Websocket
  const socket = io("http://localhost:3000");

  const handleMessageSent = () => {
    if (msg.trim() !== "") {
      console.log(`Sent: ${msg}`);
      socket.emit('sent-msg', msg);
      setMessages(prevMessages => [...prevMessages, { type: 'sent', content: msg }]);
      setMsg("");
    }
  };

  useEffect(() => {
    socket.on('get-msg', (data) => {
      setMessages(prevMessages => [...prevMessages, { type: 'received', content: data }]);
      console.log(`Received: ${data}`);
    });

    return () => {
      socket.off('get-msg');
    };
  }, [socket]);

  return (
    <>
      <div className="bg-slate-50 rounded shadow-md h-96 w-[50vw] mx-auto my-10 py-3 px-4">
        <h3 className='h-18 font-semibold text-lg bg-blue-100 rounded-md mx-5 px-5 py-2'>Waiting For Other User to Join...</h3>
        <div className="w-full h-full bg-transparent relative mx-auto py-3">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <p
                key={index}
                className={`min-h-18 max-w-64 min-w-18 text-jusify my-4 mx-4 text-wrap py-2 rounded-full shadow font-medium bg-${message.type === 'received' ? 'blue-700' : 'blue-100'} text-${message.type === 'received' ? 'white' : 'blue-950'} absolute ${message.type === 'received' ? 'left-0' : 'right-0'} px-5`}
                style={{ marginTop: `${index === 0 ? 5 : 18}px`, top: `${index * 35}px` }} // Adjust top position and margin-top
              >
                {message.content}
              </p>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No messages found</p>
          )}
        </div>
      </div>
      <div className="bg-slate-100 h-16 w-[45rem] px-4 rounded-md shadow-sm flex gap-4 items-center justify-center mx-auto">
        <input type="text" className='h-10 w-[40rem] bg-white rounded-md shadow placeholder:font-normal placeholder:indent-5 focus:border-blue-700 outline-none indent-2 font-medium' placeholder='Type Your Text Here' value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button className='bg-blue-500 h-10 w-16 rounded-md shadow-md text-white font-medium' onClick={handleMessageSent}>Send</button>
      </div>
    </>
  )
}

export default Room;
