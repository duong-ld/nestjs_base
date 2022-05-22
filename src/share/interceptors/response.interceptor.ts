import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

class ResponseSuccess {
    public readonly message: string = 'success';
    public readonly success: boolean = true;

    public total: number;
    public data: any;
    public currentPage: number;

    constructor(data: any, total?: number, currentPage?: number) {
        if (!data) {
            return;
        }

        if (data && typeof data === 'object' && data.data) {
            this.data = data.data;
        } else {
            this.data = data;
        }

        if (total !== undefined && total !== null) {
            delete data.total;
            this.total = total;
        }

        if (currentPage !== undefined && currentPage !== null) {
            delete data.currentPage;
            this.currentPage = currentPage;
        }
    }
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map(data => new ResponseSuccess(data, data?.total, data?.currentPage)));
    }
}
