import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://127.0.0.1:4000/user';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${userId}`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${user._id}`, user)
    .pipe(
      catchError((error) => {
        console.error('Error updating user:', error);
        return throwError('Failed to update user. Please try again later.');
      })
    );
}
  
  addUtilisateur(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/utilisateurs`, user);
  }
}
