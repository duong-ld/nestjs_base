import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ERole } from 'src/constants/entity.constant';
import { IAuthPayload } from 'src/modules/auth/interfaces/auth.payload';

export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const { user } = context.switchToHttp().getRequest() as { user: IAuthPayload };

        if (user.role !== ERole.ADMIN) return false;
        return true;
    }
}
