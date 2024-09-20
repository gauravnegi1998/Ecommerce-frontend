import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './Header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MiniCartComponent } from "../Pages/minicart/minicart.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, MiniCartComponent, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  title = '';
  AdminUrl: boolean = false;
  private router = inject(Router);

  constructor() {

  }

  ngOnInit(): void {
    this.AdminUrl = (this.router?.url).includes('dashboard');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.AdminUrl = (event?.url).includes('dashboard');
      }
    });
  }
}
