import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthServices } from '../services/AuthServices.service';
import { MiniCartService } from '../services/mincart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'studentSystem';

  private auth = inject(AuthServices);
  private minCartApi = inject(MiniCartService);


  ngOnInit(): void {
    this.auth._autoLogin();
    if (this.auth._getToken()) {
      this.minCartApi._getMiniCartDetail();
    }
  }

}
