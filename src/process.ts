import { IncomingMessage } from "http";
import { URL } from "url";
import { Answer, Person } from "./interfaces";

export class ServerAnswer implements Answer {
  private _status: number;
  private _body: string | Person | Person[] | null;
  constructor(status: number, body: string | Person | Person[] | null) {
    this._status = status;
    this._body = body;
  }
  get status(): number {
    return this._status;
  }
  get body(): string | Person | Person[] | null {
    return this._body;
  }
}

const route = '/api/users';

export const processRequest = (req: IncomingMessage): Answer => {
  if (req.url === undefined) return new ServerAnswer(404, 'Not found');
  const url: URL = new URL(req.url, `http://${req.headers.host}`);
  if (!url.pathname.startsWith(route)) return new ServerAnswer (404, 'Not found');
  const id: string = url.pathname.slice(route.length);
  return new ServerAnswer(404, '');
}