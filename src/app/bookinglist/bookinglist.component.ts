import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';
import { HoteltourService } from '../hoteltour.service'; 
import { Hotel } from '../hotel';
import { Tour } from '../tour';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookinglist',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './bookinglist.component.html',
  styleUrl: './bookinglist.component.css'
})
export class BookinglistComponent implements OnInit {

  bookings: Booking[] = [];
  hotels: Hotel[] = [];
  tours: Tour[] = [];
  errorMessage: string = '';

  constructor(private bookingService: BookingService, private HoteltourService: HoteltourService) { }

  ngOnInit(): void {
    this.loadBookings();
    this.loadHotels();
    this.loadTours();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe(bookings => this.bookings = bookings);
  }

  deleteBooking(id: number): void {
    this.bookingService.deleteBooking(id).subscribe(() => {
      this.loadBookings();
    });
  }

  loadHotels(): void {
    this.HoteltourService.getHotels().subscribe({
      next: (hotels: Hotel[]) => this.hotels = hotels,
      error: (error: { message: string; }) => this.errorMessage = error.message
    });
  }

  loadTours(): void {
    this.HoteltourService.getTours().subscribe({
      next: (tours: Tour[]) => this.tours = tours,
      error: (error: { message: string; }) => this.errorMessage = error.message
    });
  }

  deleteHotel(id: number): void {
    this.HoteltourService.deleteHotel(id).subscribe({
      next: () => {
        this.loadHotels();
      },
      error: (error: { message: string; }) => this.errorMessage = error.message
    });
  }

  deleteTour(id: number): void {
    this.HoteltourService.deleteTour(id).subscribe({
      next: () => {
        this.loadTours();
      },
      error: (error: { message: string; }) => this.errorMessage = error.message
    });
  }

}
