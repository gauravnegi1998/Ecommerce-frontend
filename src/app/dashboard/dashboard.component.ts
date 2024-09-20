import { Component, OnInit } from '@angular/core';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { Icons } from '../Common/Icons';
import { CommonModule } from '@angular/common';
import { InputModules } from '../inputs/inputs.module';
import _ from 'lodash';
import { DetailPageComponent } from "./components/Users/detail-page/detail-page.component";
import { UserListingComponent } from "./components/Users/userListing/userListing.component";
import { AuthServices } from '../../services/AuthServices.service';
import { ICustomerData } from '../module/commonInterfaces';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, InputModules, LucideAngularModule, DetailPageComponent, UserListingComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [
    { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(Icons) }
  ]
})
export class DashboardComponent implements OnInit {
  loginUserData!: ICustomerData;
  isActivePanel: boolean = true;
  constructor(private auth: AuthServices) { }

  ngOnInit(): void {
    const LOGIN_USER_DATA = this.auth._getUserData();
    this.loginUserData = LOGIN_USER_DATA;
  }

  ComponentMap = {
    "OverView": `<h1>Hello</h1>`
  }
  activeOption: string = "Customers";

  menuSections: any = {
    generalData: {
      title: "General",
      options: [
        { icon: "square-kanban", label: "Customers" },
        { icon: "speaker", label: "Products" }
      ]
    },
    mainMenuData: {
      title: "Main Menu",
      options: [
        { icon: "files", label: "All files" },
        { icon: "clock", label: "Recent" },
        { icon: "file-text", label: "Docs" },
        { icon: "image", label: "Photos" },
        { icon: "trash", label: "Trash" },
      ]
    }
  }


  getMenuItems(): string[] {
    return _.keys(this.menuSections);
  }

  get shortName() {
    // const LOGIN_USER_DATA = this.auth._getUserData();
    const shortName = this.loginUserData ? _.first(this.loginUserData?.firstName) as string + _.first(this.loginUserData?.lastName) as string : "";
    return shortName
  }

  handleActiveClass(option: string) {
    this.activeOption = option;
  }

}
