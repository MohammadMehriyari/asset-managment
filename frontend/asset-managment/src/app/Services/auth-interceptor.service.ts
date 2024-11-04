import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/accounts/login/')) {
      return next.handle(req);
    }

    const accessToken = this.authService.getAccessToken();
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('added access token to header', req);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('Access Token Expired Getting A New One !');
          return this.handle401Error(req, next);
        }
        console.log('error here ');
        return throwError(() => error);
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const refreshToken = this.authService.getRefreshToken();

    if (!refreshToken) {
      this.navigateToLogin();
      return throwError(() => 'No refresh token available');
    }

    return this.authService.refreshToken().pipe(
      switchMap((response: HttpResponse<any>) => {
        if (response && response.body && response.body.access) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.body.access}`,
            },
          });
          console.log('New Access Token Recieved!');
          return next.handle(req);
        }
        this.navigateToLogin();
        return throwError(() => 'Invalid refresh token');
      }),
      catchError((error) => {
        this.handleError(error);
        this.navigateToLogin();
        return throwError(() => 'Token refresh failed');
      })
    );
  }

  private navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  private handleError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 400:
        console.error('Refresh token required:', error);
        break;
      case 401:
        console.error('Token not valid:', error);
        break;
      case 415:
        console.error('Unsupported media type:', error);
        break;
      case 500:
        console.error('Internal server error:', error);
        break;
      default:
        console.error('An unexpected error occurred:', error);
    }
  }
}
