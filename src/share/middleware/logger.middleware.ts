import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

function httpRequestLoggerBuilder(req: Request): string {
    const param = `\n param: ${JSON.stringify(req.params)}`;
    const query = `\n query: ${JSON.stringify(req.query)}`;
    const body = req.method === 'POST' || req.method === 'PUT' ? `\n body: ${JSON.stringify(req.body)}` : '';
    const logger = `[${req.method} - ${req.baseUrl}]: ${param} ${query} ${body}`;
    return logger;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger(LoggerMiddleware.name);

    use(req: any, res: any, next: (error?: any) => void) {
        this.logger.log(httpRequestLoggerBuilder(req));
        next();
    }
}
