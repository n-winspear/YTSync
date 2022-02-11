import { pusher } from '../../../lib/pusher';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
    const { socket_id, channel_name, username } = req.body;

    const uuid = uuidv4();

    const presenceData = {
        user_id: uuid,
        user_info: {
            username,
        },
    };

    try {
        const auth = pusher.authenticate(socket_id, channel_name, presenceData);
        res.send(auth);
    } catch (error) {
        console.error(error);
    }
}
