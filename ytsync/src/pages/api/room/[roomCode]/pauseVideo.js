import { pusher } from '../../../../lib/pusher';

export default async function handler(req, res) {
    const { username } = req.body;
    const { roomCode } = req.query;

    await pusher.trigger(`presence-${roomCode}`, 'pause-video', {
        username,
    });

    res.status(200).json({ success: true });
}
