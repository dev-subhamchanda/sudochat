import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [roomId, setRoomId] = useState('');
    const [name, setName] = useState('');
    const [view, setView] = useState(false);
    const navigate = useNavigate();

    // Function to generate a random room ID
    const generateRoomId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let newRoomId = '';
        for (let i = 0; i < 6; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            newRoomId += characters[randomIndex];
        }
        setRoomId(newRoomId);
    };

    // Function to copy room ID to clipboard
    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        alert('Room ID copied to clipboard!');
    };

    const handleJoinRoom = () => {
        navigate(`/room:${roomId}?name=${name}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleJoinRoom();
    }

    return (
        <>
            <nav className="bg-slate-50 border-gray-200 dark:bg-gray-900">
                {/* Your nav code here */}
            </nav>
            <div className='bg-transparent mx-auto h-fit w-screen my-16'>
                <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="room" className="block mb-2 text-sm font-medium text-gray-900 ">Room ID</label>
                        <input type="text" id="rid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Paste Your Room ID Here" value={roomId} onChange={(e) => setRoomId(e.target.value)} required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
                        <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name'/>
                    </div>
                    <div className="flex items-start mb-5"></div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Join Room</button>
                    <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 mx-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => setView(!view)}>Generate Room ID</button>
                </form>
            </div>
            {view &&
                <div className="flex flex-col items-center">
                    {/* Your generate room ID UI here */}
                </div>
            }
        </>
    )
}

export default Home;
