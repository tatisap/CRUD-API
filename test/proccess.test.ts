import request from "supertest";
import { server } from "../src";
import { Person } from "../src/interfaces";

let id: string | undefined;

describe('Scenario #1', () => {
  test('When send get all users request on empty database', async () => {
    const answer = await request(server)
      .get('/api/users');
    expect(answer.statusCode).toBe(200);
    expect(answer.body).toEqual([]);
  });
  test('When send create user request', async() => {
    const answer = await request(server)
      .post('/api/users')
      .send({
        username: 'Irina',
        age: 30,
        hobbies: ['cycling', 'knitting'],
      });
    expect(answer.statusCode).toBe(201);
    expect(answer.body).toEqual('New user is successfully added');
  });
  test('When send get the created user by id request', async() => {
    const user: Person = (await request(server).get('/api/users')).body[0];
    id = user.id;
    const answer = await request(server)
      .get(`/api/users/${id}`);
    expect(answer.statusCode).toBe(200);
    expect(answer.body).toEqual(user);
  });
  test('When send update the created by id user request', async() => {
    const answer = await request(server)
      .put(`/api/users/${id}`)
      .send({
        username: 'Marina',
        age: 30,
        hobbies: ['cycling', 'knitting'],
      });
    expect(answer.statusCode).toBe(200);
    expect(answer.body).toEqual({
      id: id,
      username: 'Marina',
      age: 30,
      hobbies: ['cycling', 'knitting'],
    });
  });
  test('When send delete the created user by id request', async() => {
    const answer = await request(server)
      .delete(`/api/users/${id}`);
    expect(answer.statusCode).toBe(204);
    expect(answer.body).toEqual('');
  });
  it('When send get the deleted user by id request on empty database', async() => {
    const answer = await request(server)
      .get(`/api/users/${id}`);
    expect(answer.statusCode).toBe(404);
    expect(answer.body).toEqual('User is not found');
  });
});

describe('Scenario #2', () => {
  test('When send get request to invalid url', async () => {
      const answer = await request(server)
        .get('/api/persons');
      expect(answer.statusCode).toBe(404);
      expect(answer.body).toEqual('Resource that you requested does not exist');
  });
  test('When send create user request', async() => {
    const answer = await request(server)
      .post('/api/users')
      .send({
        username: 'Ihar',
        age: 40,
        hobbies: ['swimming'],
      });
    expect(answer.statusCode).toBe(201);
    expect(answer.body).toEqual('New user is successfully added');
  });
  let id: string | undefined;
  test('When send get the user by non-existent id request', async() => {
    id = '071d18a0-86ff-40ec-9089-154decf17d26';
    const answer = await request(server)
      .get(`/api/users/${id}`);
    expect(answer.statusCode).toBe(404);
    expect(answer.body).toEqual('User is not found');
  });
  test('When send get the user by invalid id request', async() => {
    id = (typeof id === 'string')? id.replace(id[0], 't') : '071d18a0-86ff-40ec-9089-154decf17d2y';
    const answer = await request(server)
      .get(`/api/users/${id}`);
    expect(answer.statusCode).toBe(400);
    expect(answer.body).toEqual('Invalid user id');
  });
  test('When send delete the created user by invalid id request', async() => {
    const answer = await request(server)
      .delete(`/api/users/${id}`);
    expect(answer.statusCode).toBe(400);
    expect(answer.body).toEqual('Invalid user id');
  });
  test('When send delete the created user by id request', async() => {
    const user: Person = (await request(server).get('/api/users')).body[0];
    id = user.id;
    const answer = await request(server)
      .delete(`/api/users/${id}`);
    expect(answer.statusCode).toBe(204);
    expect(answer.body).toEqual('');
  });
});

describe('Scenario #3', () => {
  test('When send create user without required fields request', async () => {
    const answer = await request(server)
    .post('/api/users')
    .send({
      username: 'Andy',
      hobbies: ['birdwatching'],
    });
  expect(answer.statusCode).toBe(400);
  expect(answer.body).toEqual('You did not send required information');
  });
  test('When send create user request', async() => {
    const answer = await request(server)
      .post('/api/users')
      .send({
        username: 'Andy',
        age: 46,
        hobbies: ['birdwatching'],
      });
    expect(answer.statusCode).toBe(201);
    expect(answer.body).toEqual('New user is successfully added');
  });
  let id: string | undefined;
  test('When send update the user by non-existent id request', async() => {
    id = '071d18a0-86ff-40ec-9089-154decf17d26';
    const answer = await request(server)
      .put(`/api/users/${id}`)
      .send({
        username: 'Andy',
        age: 45,
        hobbies: ['birdwatching'],
      });
    expect(answer.statusCode).toBe(404);
    expect(answer.body).toEqual('User is not found');
  });
  test('When send update the user by invalid id request', async() => {
    id = (typeof id === 'string')? id.replace(id[0], 't') : '071d18a0-86ff-40ec-9089-154decf17d2y';
    const answer = await request(server)
    .put(`/api/users/${id}`)
    .send({
      username: 'Andy',
      age: 45,
      hobbies: ['birdwatching'],
    });
    expect(answer.statusCode).toBe(400);
    expect(answer.body).toEqual('Invalid user id');
  });
  test('When send update the created by id user request', async() => {
    const user: Person = (await request(server).get('/api/users')).body[0];
    id = user.id;
    const answer = await request(server)
      .put(`/api/users/${id}`)
      .send({
        username: 'Andy',
        age: 45,
        hobbies: ['birdwatching'],
      });
    expect(answer.statusCode).toBe(200);
    expect(answer.body).toEqual({
      id: id,
      username: 'Andy',
      age: 45,
      hobbies: ['birdwatching'],
    });
  });
  test('When send get all users request on non-empty database', async () => {
    const answer = await request(server)
      .get('/api/users');
    expect(answer.statusCode).toBe(200);
    expect(answer.body).toEqual([{
      id: id,
      username: 'Andy',
      age: 45,
      hobbies: ['birdwatching'],
    }]);
  });
});

afterAll(async () => {
  server.close();
});