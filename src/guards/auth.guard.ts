import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // return of(false).pipe(delay(2000));
    return true;
  }
}
