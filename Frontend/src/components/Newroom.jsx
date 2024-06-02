import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { generateRoomId, handleJoinRoom } from '../modules/Room-modules';
import { copyRoomId } from '../modules/Action-modules';
import { AiTwotoneDiff } from "react-icons/ai";
import { Toaster, toast } from "sonner";

const Newroom = () => {
  const [name, setName] = useState('');
  const [roomID, setRoomID] = useState('');
  const navigatorHook = useNavigate();

  const handleGetRoomId = () => {
    const roomId = generateRoomId();
    setRoomID(roomId);
    toast.info("Room Id Created")
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleJoinRoom(navigatorHook, roomID);
  };

  const handleCopyFunction = (e) =>{
    let state;
    e.preventDefault()
    state = copyRoomId(roomID)
    if(state)
      toast.success("Room ID Copied");
    else
      toast.error("Couldn't copy Room ID")
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-slate-50 border-gray-200 dark:bg-gray-900 p-4 flex justify-between">
        <h3 className="font-medium dark:text-slate-200 text-slate-900 text-lg">Sudo Chat</h3>
        <span className="text-gray-500 text-sm">About the App</span>
      </nav>
      <Toaster position="top-center" invert theme="system"/>
      {/* Form */}
      <form onSubmit={handleFormSubmit} className="max-w-sm mx-auto mt-4">
        <div className="mb-5">
          <label htmlFor="hostname" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
          <input
            type="text"
            placeholder="Your Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-5 flex gap-5">
          <input
            type="text"
            readOnly
            value={roomID}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="Click on Get Room Id to fill this field"
          />
          <button onClick={handleCopyFunction} className="h-auto w-auto p-3 rounded-lg shadow-md text-xl font-semibold bg-slate-100 text-blue-700"><AiTwotoneDiff /></button>
        </div>
        <div className="flex items-start mb-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Join Room
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleGetRoomId}
          >
            Get Room Id
          </button>
        </div>
      </form>
    </div>
  );
};

export default Newroom;
