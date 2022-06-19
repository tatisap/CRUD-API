import http, { IncomingMessage, Server, ServerResponse } from 'http';
import { Answer } from './interfaces.js';
import { RequestProcessor } from './process.js';

export const server: Server = http.createServer(async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  try {
    const answer: Answer = await new RequestProcessor().execute(req);
    res.writeHead(answer.status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(answer.body));
  }
  catch (err) {
    if (err instanceof Error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: `${err.message}`,
      }));
    } else {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        message: `Server does not answer`,
    }));
  }
  }
});

server.listen(4000);