import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  open = false;
  authenticated: boolean;
  authSubscription: Subscription;
  admin: boolean;
  adminSubscription: Subscription;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.authSubscription = this.auth.authenticatedChanged.subscribe(
      (authenticated: boolean) => this.authenticated = authenticated);
    this.adminSubscription = this.auth.adminChanged.subscribe(
      (admin: boolean) => this.admin = admin);
  }

  toggle() {
    this.open = !this.open;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.adminSubscription.unsubscribe();
  }
}
