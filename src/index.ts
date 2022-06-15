import http, { IncomingMessage, Server, ServerResponse } from 'http';
import { database } from './db.js';
import { Answer } from './interfaces.js';
import { processRequest } from './process.js';

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse): void => {
  const answer: Answer = processRequest(req);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(database));
});

server.listen(4000);