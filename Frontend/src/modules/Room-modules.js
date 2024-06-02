export const generateRoomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newRoomId = '';
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        newRoomId += characters[randomIndex];
    }
    return newRoomId;
};

export const handleJoinRoom = (navigate, roomId) => {
    navigate(`/room/:${roomId}`);
};

