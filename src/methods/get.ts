import { database } from "../db.js";
import { Answer, Person } from "../interfaces";
import { ServerAnswer } from "../process.js";
import { validate } from 'uuid';

export const get = (id: string): Answer => {
  if (id === '') {
    return new ServerAnswer(200, database);
  }
  if (!validate(id)) {
    return new ServerAnswer(400, 'Invalid user id');
  }
  const user: Person | undefined = database.find((user: Person): boolean => user.id === id);
  
  if (user) {
    return new ServerAnswer(200, user);
  } else {
    return new ServerAnswer(404, 'User is not found');
  }
}