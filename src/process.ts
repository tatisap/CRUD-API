import { IncomingMessage } from "http";
import { URL } from "url";
import { Answer, Person } from "./interfaces";
import { get } from "./methods/get.js";
import { post } from "./methods/post.js";
import { put } from "./methods/put.js";
import { del } from "./methods/delete.js";

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

export class RequestProcessor {

  public async execute(req: IncomingMessage): Promise<Answer> {
    if (req.url === undefined) return new ServerAnswer(404, 'Resource that you requested does not exist');
    const url: URL = new URL(req.url, `http://${req.headers.host}`);
    if (!url.pathname.startsWith(route)) return new ServerAnswer (404, 'Resource that you requested does not exist');

    const id: string = url.pathname.slice(route.length + 1); 
    const body: string = await this.getBody(req);
    const contentType: string | undefined = (req.headers['content-type']);

    return this.processRequest(req.method, id, body, contentType);
  }

  private async getBody(req: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk: Buffer) => body += chunk.toString());
      req.on('end', () => resolve(body));
      req.on('error', (err: Error) => reject(err));
    });
  }
  
  private processRequest(method: string | undefined, id: string, body: string, contentType: string | undefined): Answer {
    switch (method) {
      case 'GET':
        return this.runGetMethod(id);
        break;
      case 'POST':
        return this.runPostMethod(id, body, contentType);
        break;
      case 'PUT':
        return this.runPutMethod(id, body, contentType);
        break;
      case 'DELETE':
        return this.runDeleteMethod(id);
      default:
        return this.runUnknownMethod();
        break;
    }
  }

  private runUnknownMethod(): Answer {
    return new ServerAnswer(404, 'Method you are trying to execute is not found');
  }

  private runGetMethod = get;
  private runPostMethod = post;
  private runPutMethod = put;
  private runDeleteMethod = del;
}
