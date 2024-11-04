import { Injectable } from '@angular/core';
import { DataService } from './data-service.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RoleInterface, ROLES } from '../../Interfaces/role-interface';
import { HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private dataservice: DataService) {}

  login(data: any): Observable<any> {
    return this.dataservice.post(`accounts/login/`, data).pipe(
      tap((response: HttpResponse<any>) => {
        if (response && response.body && response.body.tokens) {
          const tokens = response.body.tokens;

          localStorage.setItem('accessToken', tokens.access);
          localStorage.setItem('refreshToken', tokens.refresh);
          const userRole = ROLES.find(
            (role) => role.id === response.body.userroleid
          );
          localStorage.setItem('userRole', userRole ? userRole.name : '');
        }
      })
    );
  }
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      return this.dataservice
        .post(`accounts/login/refresh/`, { refresh: refreshToken })
        .pipe(
          tap((response: HttpResponse<any>) => {
            if (response && response.body && response.body.access) {
              localStorage.setItem('accessToken', response.body.access);
            }
          })
        );
    } else {
      // Handle the case where refresh token is not available
      return new Observable((observer) => {
        observer.error('Refresh token not available');
      });
    }
  }
  logout(refreshToken?: string): Observable<any> {
    return this.dataservice
      .post(`accounts/logout/`, refreshToken ? { refresh: refreshToken } : {})
      .pipe(
        tap(() => {
          console.log('removing tokens from local storage');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userRole');
        })
      );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('accessToken') !== null;
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  getUserRole(): string {
    return localStorage.getItem('userRole') || '';
  }
}
