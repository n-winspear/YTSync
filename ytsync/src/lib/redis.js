import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}

export async function createIndex() {
    await connect();

    const repository = new Repository(schema, client);

    await repository.createIndex();
}

class Room extends Entity {}
let schema = new Schema(
    Room,
    {
        code: { type: 'string' },
        playlist: { type: 'array', videos: { type: 'string' } },
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

    return id;
}

export async function getRoom(code) {
    await connect();

    const repository = new Repository(schema, client);

    const room = repository.search().where('code').eq(code).return.first();

    return room;
}
