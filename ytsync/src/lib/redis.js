import { Entity, Schema, Repository, Client } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

export async function createIndex() {
    await connect();

    const repository = new Repository(schema, client);

    await repository.dropIndex();

    await repository.createIndex();

    await client.close();
}

class Room extends Entity {}
let schema = new Schema(
    Room,
    {
        code: { type: 'string' },
        playlist: {
            type: 'array',
            videos: { type: 'string' },
        },
    },
    {
        dataStructure: 'JSON',
    }
);

export async function createRoom(data) {
    await connect();

    const repository = new Repository(schema, client);

    const room = repository.createEntity(data);

    const id = await repository.save(room);

    await client.execute(['EXPIRE', `Room:${id}`, 43200]);

    await client.close();

    return id;
}

export async function getRoom(code) {
    await connect();

    const repository = new Repository(schema, client);

    const room = await repository
        .search()
        .where('code')
        .equals(code)
        .returnFirst();

    await client.close();

    return room;
}

export async function addVideoToRoom(code, videoInfo) {
    await connect();

    const repository = new Repository(schema, client);

    const room = await repository
        .search()
        .where('code')
        .equals(code)
        .returnFirst();

    await room.playlist.push(videoInfo);

    const id = await repository.save(room);

    await client.close();

    return id;
}

export async function deleteVideoFromRoom(code, videoId) {
    await connect();

    const repository = new Repository(schema, client);

    let room = await repository
        .search()
        .where('code')
        .equals(code)
        .returnFirst();

    room.playlist = await room.playlist.filter((video) => {
        const splitId = video.split('|')[0];
        return videoId !== splitId;
    });

    const id = await repository.save(room);

    await client.close();

    return id;
}
