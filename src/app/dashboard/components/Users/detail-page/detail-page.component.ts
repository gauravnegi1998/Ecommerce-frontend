import { Component, ElementRef, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from '../../../../../services/ApiHelper.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ICustomerData } from '../../../../module/commonInterfaces';
import { InputModules } from '../../../../inputs/inputs.module';
import { CommonModule, Location } from '@angular/common';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { Icons } from '../../../../Common/Icons';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from '../../../../../services/CustomerService.service';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [InputModules, LucideAngularModule, CommonModule],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss',
  providers: [
    { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(Icons) }
  ]
})
export class DetailPageComponent implements OnInit, OnChanges {

  userDetail: ICustomerData | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { selectedUser: ICustomerData },
    private api: ApiService, private location: Location, private route: ActivatedRoute, private customerApi: CustomerService) { }

  @ViewChild("fileInput") el: ElementRef<any> | undefined;

  image = { previousImg: "", newImage: "" };

  ngOnInit(): void {
    // this.route?.paramMap?.subscribe({
    //   next: (data) => this._getUserDetailUsingId(data),
    //   error: (error) => console.log(error)
    // });
    this.userDetail = this.data?.selectedUser;
    this.image = { previousImg: this.data?.selectedUser.profileImage, newImage: this.data?.selectedUser.profileImage };

    console.log(this.userDetail, "this.data?.selectedUser > > this.data?.selectedUser")
  }

  get isProfileMatch() {
    return this.image.previousImg === this.image.newImage
  }

  _handleImageChange(event?: HTMLElement) {
    if (this.el?.nativeElement.files?.length > 0) {

      const reader = new FileReader();
      // reader.readAsText(this.el?.nativeElement.files[0]);
      const file = this.el?.nativeElement.files[0];
      reader.onload = (event) => {
        this.image['newImage'] = String(reader.result);
        // console.log(reader.result, 'reader.result > reader.result > reader.result')
      }
      reader.readAsDataURL(file)
    }
    this.el?.nativeElement.click()
  }

  _uploadImage(event: any) {
    const formData = new FormData();
    formData.append('image', this.el?.nativeElement.files[0]);
    this.customerApi._updateProfileImage({ id: this.userDetail?._id, formData }, (res) => {
      if (res.status === "ok") {
        this.image = { previousImg: res.updateImage, newImage: res.updateImage }
      }
    });
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
