import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'https://api.ecommerce.com/v1';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  createUser(payload: any): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, payload);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }

  updateUser(userId: string, payload: any): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/users/${userId}`, payload);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/${userId}`);
  }

  getUserProfile(userId: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/users/${userId}/profile`);
  }

}