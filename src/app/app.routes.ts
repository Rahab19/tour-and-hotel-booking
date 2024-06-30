import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BookingformComponent } from './bookingform/bookingform.component';
import { authGuard } from './auth.guard';
import { HttpClient } from '@angular/common/http';

export const routes: Routes = [
    // { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'booking', component: BookingformComponent, canActivate: [authGuard] },
    { path: 'admin', component: BookingformComponent, canActivate: [authGuard], data: { isAdmin: true } },
    // { path: 'add-hotel', component: BookingformComponent, canActivate: [authGuard], data: { type: 'hotel', isAdmin: true } },
    // { path: 'edit-hotel/:id', component: BookingformComponent, canActivate: [authGuard], data: { type: 'hotel', isAdmin: true } },
    // { path: 'add-tour', component: BookingformComponent, canActivate: [authGuard], data: { type: 'tour', isAdmin: true } },
    // { path: 'edit-tour/:id', component: BookingformComponent, canActivate: [authGuard], data: { type: 'tour', isAdmin: true } },
  
];
