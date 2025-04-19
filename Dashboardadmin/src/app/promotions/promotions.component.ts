import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  promotions: any[] = [];
  newPromotion: any = { name: '', description: '' };
  private apiUrl = 'http://localhost:4000/api/promotions'; // Ensure the correct URL

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPromotions();
  }

  fetchPromotions(): void {
    this.http.get<any[]>(`${this.apiUrl}`).subscribe(
      data => {
        this.promotions = data;
      },
      error => {
        console.error('Error fetching promotions:', error);
      }
    );
  }

  addPromotion(): void {
    this.http.post<any>(`${this.apiUrl}/register`, this.newPromotion).subscribe(
      response => {
        this.promotions.push(response);
        this.newPromotion = { name: '', description: '' }; // Reset the form
        console.log('Promotion added successfully');
      },
      error => {
        console.error('Error adding promotion:', error);
      }
    );
  }

  deletePromotion(id: string): void {
    this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(
      () => {
        this.promotions = this.promotions.filter(promotion => promotion._id !== id);
        console.log('Promotion deleted successfully');
      },
      error => {
        console.error('Error deleting promotion:', error);
      }
    );
  }
}
