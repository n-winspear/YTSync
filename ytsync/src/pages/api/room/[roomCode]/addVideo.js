import { addVideoToRoom } from '../../../../lib/redis';

export default async function handler(req, res) {
    const { roomCode } = req.query;
    const { videoId, channelThumbnailURL } = req.body;

    const videoInfo = `${videoId}|${channelThumbnailURL}`;

    const id = await addVideoToRoom(roomCode, videoInfo);

    res.status(204).end();
}
