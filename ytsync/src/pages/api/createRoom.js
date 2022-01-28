import { createRoom } from '../../lib/redis';
import { u4 as uuidv4 } from 'uuid';

const roomCodeGenerator = async () => {
    const codeLength = 5;
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let roomCode = '';

    for (var i = 0; i < codeLength; i++)
        roomCode += CHARS.charAt(Math.floor(Math.random() * CHARS.length));

    return roomCode;
};

export default async function handler(req, res) {
    const roomCode = await roomCodeGenerator();

    const room = {
        code: roomCode,
        playlist: [],
    };

    const id = await createRoom(room);

    res.status(201).json({ id, room });
}
