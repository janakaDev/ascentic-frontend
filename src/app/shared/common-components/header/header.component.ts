import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/Service/auth/auth.service';
import { ToasterService } from '../../../core/Service/toaster/toaster.service';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeInOnEnterAnimation({ delay: 550 })]
})
export class HeaderComponent implements OnInit {
  isDisabled = false;
  isHidden = false;
  isLoggedIn = this.auth.isUserExist$;
  username = this.auth.currentUserName$;

  constructor(
    private auth: AuthService,
    private toaster: ToasterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth.userType$.subscribe((data: string) => {
      if (data === 'agency') {
        this.isHidden = true;
      } else if (data === 'advertiser') {
        this.isDisabled = true;
      } else if (data === 'admin') {
        this.isDisabled = this.isHidden = false;
      }
    });
  }

  /**
   * Logout user
   */
  async clickLogout() {
    try {
      const res = await this.auth.logout();
      if ((res as any).success) {
        this.router.navigateByUrl('/');
      }
    } catch (error) {
      this.toaster.errorToast(error.error.message);
    }
  }
}
