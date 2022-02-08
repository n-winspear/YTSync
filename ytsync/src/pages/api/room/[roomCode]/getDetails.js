import { getRoom } from '../../../../lib/redis';

export default async function handler(req, res) {
    const { roomCode } = req.query;

    const room = await getRoom(roomCode);

    res.status(200).json({ room });
}
