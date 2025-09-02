import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'https://api.ecommerce.com/v1';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/orders`);
  }

  createOrder(payload: any): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders`, payload);
  }

  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${orderId}`);
  }

  updateOrderStatus(orderId: string, payload: any): Observable<Order> {
    return this.http.patch<Order>(`${this.baseUrl}/orders/${orderId}`, payload);
  }

  cancelOrder(orderId: string): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/orders/${orderId}/cancel`, {});
  }

}