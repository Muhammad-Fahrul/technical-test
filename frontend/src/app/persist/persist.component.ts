import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-persist',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './persist.component.html',
})
export class PersistComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    // Jika accessToken tidak ada di memori, coba refresh token
    if (!this.authService.getAccessToken()) {
      this.authService.refreshToken().subscribe({
        error: () => {
          console.log('oke');
          this.authService.logout();
        },
      });
    }

    // Berlangganan pada perubahan status otentikasi
    this.authService.authState$.subscribe((token) => {
      if (!token) {
        this.router.navigate(['/login']);
      }
    });
  }
}
