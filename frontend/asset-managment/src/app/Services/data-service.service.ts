import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  get(endpoint: string): Observable<HttpResponse<any>> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, {
      observe: 'response',
    });
  }

  post(endpoint: string, data: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, {
      observe: 'response',
    });
  }

  put(endpoint: string, data: any): Observable<HttpResponse<any>> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data, {
      observe: 'response',
    });
  }

  delete(endpoint: string, data?: any): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`, {
      observe: 'response',
      body: data,
    });
  }
  patch(endpoint: string, data: any): Observable<HttpResponse<any>> {
    return this.http.patch(`${this.baseUrl}/${endpoint}`, data, {
      observe: 'response',
    });
  }
}
