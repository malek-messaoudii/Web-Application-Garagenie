import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactForm } from './models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private backendURL = 'http://localhost:4000/formcontact';

  constructor(private http :HttpClient) { 
    
  }
  sendContactForm(ContactForm: any) {
    return this.http.post(`${this.backendURL}/addformcontact`, ContactForm);
  }

  getAllMessages(): Observable<ContactForm[]> {
    return this.http.get<ContactForm[]>(`${this.backendURL}/getall`);
  }

  deleteMessage(userId: string) {
    return this.http.delete(`http://127.0.0.1:4000/formcontact/delete/${userId}`);
  }

}
