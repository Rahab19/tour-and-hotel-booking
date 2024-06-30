import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Hotel } from './hotel';
import { Tour } from './tour';
import { Booking } from './booking';

@Injectable({
  providedIn: 'root'
})
export class HoteltourService {

  private apiUrl = 'https://localhost:4000';

  constructor(private http: HttpClient) { }

  // Hotels
  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/hotels`)
      .pipe(catchError(this.handleError));
  }

  addHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(`${this.apiUrl}/hotels`, hotel)
      .pipe(catchError(this.handleError));
  }

  updateHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(`${this.apiUrl}/hotels/${hotel.id}`, hotel)
      .pipe(catchError(this.handleError));
  }

  deleteHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/hotels/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Tours
  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(`${this.apiUrl}/tours`)
      .pipe(catchError(this.handleError));
  }

  addTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(`${this.apiUrl}/tours`, tour)
      .pipe(catchError(this.handleError));
  }

  updateTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(`${this.apiUrl}/tours/${tour.id}`, tour)
      .pipe(catchError(this.handleError));
  }

  deleteTour(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tours/${id}`)
      .pipe(catchError(this.handleError));
  }

  bookHotel(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, booking)
      .pipe(catchError(this.handleError));
  }

  bookTour(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, booking)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
