import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from './models/promotion.model'; // Ensure the path is correct

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private apiUrl = 'http://localhost:4000/promotions';

  constructor(private http: HttpClient) { }

  getAllPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(`${this.apiUrl}/`);
  }

  addPromotion(promotion: Promotion): Observable<Promotion> {
    return this.http.post<Promotion>(`${this.apiUrl}/register`, promotion);
  }

  deletePromotion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
