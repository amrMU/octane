import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, headers, body } = req;
    const timestamp = new Date().toISOString();

    const oldSend = res.send;

    let responseBody: any;

    res.send = function (data: any) {
      responseBody = data; // تخزين الريسبونس

      const log = `[${timestamp}] ${method} ${originalUrl}
                Headers: ${JSON.stringify(headers, null, 2)}
                Body: ${JSON.stringify(body, null, 2)}
                Status: ${res.statusCode}
                Response: ${data}

                `;

      const logDir = path.join(__dirname, '..', '..', '..', 'logs');
      const logFile = path.join(logDir, 'request.log');

      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
      }

      fs.appendFile(logFile, log, (err) => {
        if (err) console.error('Failed to write log:', err);
      });

      return oldSend.call(this, data);
    };

    next();
  }
}
