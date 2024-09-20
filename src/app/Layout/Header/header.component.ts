import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { InputModules } from '../../inputs/inputs.module';
import { RouterModule } from '@angular/router';
import { AuthServices } from '../../../services/AuthServices.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, InputModules, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private auth = inject(AuthServices);
  isAuthenticate: boolean = false;

  ngOnInit(): void {
    this.auth.observable$.subscribe((data) => {
      this.isAuthenticate = data ? true : false;
    })

  }

  _onLogOutClick(events: Event) {
    this.auth._handleLogout();
  }

}
