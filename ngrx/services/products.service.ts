import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'https://api.ecommerce.com/v1';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products`);
  }

  createProduct(payload: any): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, payload);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${productId}`);
  }

  updateProduct(productId: string, payload: any): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/${productId}`, payload);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/products/${productId}`);
  }

  getProductReviews(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/products/${productId}/reviews`);
  }

}