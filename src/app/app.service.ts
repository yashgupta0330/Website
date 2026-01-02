import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserData } from './models/Users';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) {}

  saveData(userData: UserData): Observable<any> {
    return forkJoin([
      // Save user information in the database
      this.http.post<any>('https://anarish-website-v3.vercel.app/users/submitform', userData)
        .pipe(catchError(this.handleError)),

      // Send mail to Anarish and to User
      this.http.post<any>('https://www.anarish.com/backend/mail/mail.php', userData)
        .pipe(catchError(this.handleError))
    ]);
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
