import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../booking';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HoteltourService } from '../hoteltour.service';
import { Hotel } from '../hotel';
import { Tour } from '../tour';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-bookingform',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './bookingform.component.html',
  styleUrl: './bookingform.component.css'
})
export class BookingformComponent implements OnInit {

  bookingForm!: FormGroup;
  hotelForm!: FormGroup;
  tourForm!: FormGroup;
  isEditMode = false;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private hotelTourService: HoteltourService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      id: [0],
      // type: ['hotel', Validators.required],
      // name: ['', [Validators.required, Validators.minLength(3)]],
      // date: ['', Validators.required]
    });
    this.hotelForm = this.fb.group({
      id: [0],
      // name: ['', [Validators.required, Validators.minLength(3)]],
      // location: ['', Validators.required]
    });

    this.tourForm = this.fb.group({
      id: [0],
      // name: ['', [Validators.required, Validators.minLength(3)]],
      // destination: ['', Validators.required],
      // duration: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const type = this.route.snapshot.data['type'];
    if (id) {
      this.isEditMode = true;
      this.bookingService.getBookings().subscribe({
        next: (bookings) => {
          const booking = bookings.find(b => b.id === +id);
          if (booking) {
            this.bookingForm.patchValue(booking);
          } else {
            this.errorMessage = 'Booking not found';
          }
        },
        error: (error) => this.errorMessage = error.message
      });
    }
    if (id && type === 'hotel') {
      this.isEditMode = true;
      this.hotelTourService.getHotels().subscribe({
        next: (hotels: any[]) => {
          const hotel = hotels.find(h => h.id === +id);
          if (hotel) {
            this.hotelForm.patchValue(hotel);
          } else {
            this.errorMessage = 'Hotel not found';
          }
        },
        error: (error: { message: string; }) => this.errorMessage = error.message
      });
    } else if (id && type === 'tour') {
      this.isEditMode = true;
      this.hotelTourService.getTours().subscribe({
        next: (tours: any[]) => {
          const tour = tours.find(t => t.id === +id);
          if (tour) {
            this.tourForm.patchValue(tour);
          } else {
            this.errorMessage = 'Tour not found';
          }
        },
        error: (error: { message: string; }) => this.errorMessage = error.message
      });
    }
  }

  onSubmit(): void {
    if (this.bookingForm.valid) {
      const booking: Booking = this.bookingForm.value;
      const operation = this.isEditMode
        ? this.bookingService.updateBooking(booking)
        : this.bookingService.addBooking(booking);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => this.errorMessage = error.message
      });
    }
  }
//   if(this.hotelForm.valid) {
//     const hotel: Hotel = this.hotelForm.value;
//     const operation = this.isEditMode
//       ? this.hotelTourService.updateHotel(hotel)
//       : this.hotelTourService.addHotel(hotel);

//     operation.subscribe({
//       next: () => {
//         this.router.navigate(['/']);
//       },
//       error: (error: { message: any; }) => this.errorMessage = error.message
//     });
//   }
// }

onSubmitHotel(): void {
  if(this.hotelForm.valid) {
  const hotel: Hotel = this.hotelForm.value;
  const operation = this.isEditMode
    ? this.hotelTourService.updateHotel(hotel)
    : this.hotelTourService.addHotel(hotel);

  operation.subscribe({
    next: () => {
      this.router.navigate(['/']);
    },
    error: (error: { message: any; }) => this.errorMessage = error.message
  });
}
}

onSubmitTour(): void {
  if(this.tourForm.valid) {
  const tour: Tour = this.tourForm.value;
  const operation = this.isEditMode
    ? this.hotelTourService.updateTour(tour)
    : this.hotelTourService.addTour(tour);

  operation.subscribe({
    next: () => {
      this.router.navigate(['/']);
    },
    error: (error: { message: any; }) => this.errorMessage = error.message
  });
}
}
}

