import { Answer, Person } from "../interfaces";
import { ServerAnswer } from "../process.js";
import { validate } from 'uuid';
import { database } from "../db.js";

export const put = (id: string, body: string, contentType: string | undefined): Answer => {
  if (!validate(id)) {
    return new ServerAnswer(400, 'Invalid user id');
  }
  if (contentType !== 'application/json') return new ServerAnswer(400, 'Content format is not JSON');
  const {username, age, hobbies} = JSON.parse(body) as Person;
  if([username, age, hobbies].filter(key => key === undefined).length) return new ServerAnswer(400, 'You did not send required information');
  
  const user: Person | undefined = database.find((user: Person): boolean => user.id === id);
  if (user) {
    [user.username, user.age, user.hobbies] = [username, age, hobbies];
    return new ServerAnswer(200, user);
  } else {
    return new ServerAnswer(404, 'User is not found');
  }
}