import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../../../services/ApiHelper.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ICustomerData } from '../../../../module/commonInterfaces';
import { InputModules } from '../../../../inputs/inputs.module';
import { Location } from '@angular/common';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { Icons } from '../../../../Common/Icons';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [InputModules, LucideAngularModule],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss',
  providers: [
    { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(Icons) }
  ]
})
export class DetailPageComponent implements OnInit, OnChanges {

  userDetail: ICustomerData | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedUser: ICustomerData }, private api: ApiService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route?.paramMap?.subscribe({
    //   next: (data) => this._getUserDetailUsingId(data),
    //   error: (error) => console.log(error)
    // });
    this.userDetail = this.data?.selectedUser;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, '>>>>>>>>>>>>>>>>>>>')
  }

  // _getUserDetailUsingId(params: ParamMap) {
  //   const ID = params?.get('id');

  //   this.api.get(`/api/customers/${ID}`).then((response) => {
  //     if (response?.status === 'ok') {
  //       this.userDetail = response?.data;
  //     }
  //   }).catch(error => {
  //     console.log(error);
  //   })
  // }

  _handleBackClick() {
    console.log(this.location, 'this routter')
    this.location.back();
    // this.router.navigateByUrl('/')
  }

}
