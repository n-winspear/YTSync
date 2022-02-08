import { deleteVideoFromRoom } from '../../../../lib/redis';

export default async function handler(req, res) {
    const { roomCode } = req.query;
    const { videoId } = req.body;

    const id = await deleteVideoFromRoom(roomCode, videoId);

    res.status(204).end();
}
