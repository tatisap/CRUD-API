import { Answer, Person } from "../interfaces";
import { ServerAnswer } from "../process.js";
import { validate } from 'uuid';
import { database } from "../db.js";

export const del =  (id: string): Answer => {
  if (!validate(id)) {
    return new ServerAnswer(400, 'Invalid user id');
  }
  const userIndex: number= database.findIndex((user: Person): boolean => user.id === id);

  if (userIndex !== -1) {
    database.splice(userIndex, 1);
    return new ServerAnswer(204, '');
  } else {
    return new ServerAnswer(404, 'User is not found');
  }
}