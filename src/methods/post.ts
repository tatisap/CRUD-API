import { Answer, Person } from "../interfaces";
import { ServerAnswer } from "../process.js";
import { v4 } from 'uuid';
import { database } from "../db.js";

export const post = (id: string, body: string, contentType: string | undefined): Answer => {
  if (id !== '') {
    return new ServerAnswer(404, 'Resource that you requested does not exist');
  }

  if (contentType !== 'application/json') return new ServerAnswer(400, 'Content format is not JSON');
  const {username, age, hobbies} = JSON.parse(body) as Person;
  console.log(body);
  console.log([username, age, hobbies].filter(key => key === undefined));
  if([username, age, hobbies].filter(key => key === undefined).length) return new ServerAnswer(400, 'You did not send required information');

  const userId: string = v4();

  database.push({
    id: userId,
    username: username,
    age: age,
    hobbies: hobbies,
  });

  return new ServerAnswer(201, 'New user is successfully added');
}