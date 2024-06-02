import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Newroom from "./Newroom";
import { handleJoinRoom } from "../modules/Room-modules";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [view, setView] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    setView(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent automatic form submission
    if (roomId.length === 6) {
      handleJoinRoom(navigate, roomId);
    } else {
      setError("Room ID must be 6 digits long.");
    }
  };

  return (
    <>
      {view ? (
        <Newroom />
      ) : (
        <>
          {/* Navbar */}
          <nav className="bg-slate-50 border-gray-200 dark:bg-gray-900 p-4 flex justify-between">
            <h3 className="font-medium dark:text-slate-200 text-slate-900 text-lg">
              Sudo Chat
            </h3>
            <span className="text-gray-500 text-sm">About the App</span>
          </nav>
          <div className="bg-transparent mx-auto h-fit w-screen my-16">
            <form className="max-w-sm mx-auto" onSubmit={handleFormSubmit}>
              <div className="mb-5">
                <label
                  htmlFor="room"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Room ID
                </label>
                <input
                  type="text"
                  id="rid"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter 6-Digit Room ID"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name"
                  required
                />
              </div>
              {error && <p className="text-red-500 mb-3">{error}</p>}
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
                  onClick={handleCreateRoom}
                >
                  Create a new Room
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
