import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  // Check if the user is logged in
  if (localStorage.getItem('isLoggedIn') === 'true') {
    return true; // Allow access
  } else {
    // Redirect to login page
    router.navigate(['/login']);
  return true;
}
}
