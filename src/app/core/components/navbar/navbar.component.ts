import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'home-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [{
    provide: BsDropdownConfig, useValue: {
      // isAnimated: true,
      autoClose: true
    }
  }]
})
export class NavbarComponent {
  constructor(
    private account: AccountService,
    private router: Router
  ) { }

  logout() {
    this.account.logout()
    this.router.navigate(['/login'])
  }
}
