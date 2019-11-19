import { Component } from '@angular/core';
import { AuthService } from './core/Service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = this.auth.isUserExist$;

  constructor(private auth: AuthService) {}
}
