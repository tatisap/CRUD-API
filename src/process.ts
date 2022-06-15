import { IncomingMessage } from "http";
import { URL } from "url";
import { Answer, Person } from "./interfaces";

class ErrorAnswer implements Answer {
  _status: string;
  _message: string;
  constructor(status: string, message: string) {
    this._status = status;
    this._message = message;
  }
  get status(): string {
    return this._status;
  }
  get message(): string {
    return this._message;
  }
}

class PositiveAnswer implements Answer {
  _status: string;
  _message: string;
  _data: Person | Person[];
  constructor(status: string, message: string, data: Person | Person[]) {
    this._status = status;
    this._message = message;
    this._data = data;
  }
  get status(): string {
    return this._status;
  }
  get message(): string {
    return this._message;
  }
  get data(): Person | Person[] {
    return this._data;
  }
}

export const processRequest = (req: IncomingMessage): Answer => {
  if (req.url === undefined) return new ErrorAnswer('', '');
  const url: URL = new URL(req.url, `http://${req.headers.host}`);
  return new PositiveAnswer('', '', '');
}