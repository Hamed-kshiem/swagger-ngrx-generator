import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = 'https://api.ecommerce.com/v1';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

  createCategory(payload: any): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categories`, payload);
  }

  getCategoryById(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/categories/${categoryId}`);
  }

  updateCategory(categoryId: string, payload: any): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categories/${categoryId}`, payload);
  }

}