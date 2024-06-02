export const copyRoomId = (roomId) => {
    return navigator.clipboard.writeText(roomId)
        .then(() => {
            return true; // Indicating success
        })
        .catch(() => {
            return false; // Indicating failure
        });
};
