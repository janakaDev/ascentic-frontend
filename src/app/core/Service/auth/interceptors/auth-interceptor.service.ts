import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LocalStorage } from '../../../../../common/local-storage';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private store: LocalStorage,
    private router: Router
  ) {}

  /**
   * Interceptor method to handle request calls and
   * avoid 401 case to refresh token
   * @param  {HttpRequest<any>} req
   * @param  {HttpHandler} next
   * @returns Observable
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const identifier = _.last(req.url.split('/'));
    switch (identifier) {
      case 'login':
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });
        return next.handle(req);

      case 'refresh':
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json'
          }
        });
        return next.handle(req).do(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              event = event.clone({ body: event.body });
              return event;
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.auth.clearLocalStorage();
              this.router.navigateByUrl('/login');
            }
          }
        );

      default:
        req = req.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              this.auth.currentUserAuthenticationToken$.value
            }`
          }
        });
        return next.handle(req).do(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              return event;
            }
          },
          (error: any) => {
            if (error instanceof HttpErrorResponse) {
              this.router.navigateByUrl('/login');
            }
          }
        );
    }
  }
}
