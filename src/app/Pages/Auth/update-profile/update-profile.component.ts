import { Component, OnInit } from '@angular/core';
import { SignupAndUpdateComponent } from '../components/signupAndUpdate/signupAndUpdate.component';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from '../../../../services/ApiHelper.service';
import _ from 'lodash';
import { InputModules } from "../../../inputs/inputs.module";
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [SignupAndUpdateComponent, FormsModule, ReactiveFormsModule, InputModules, LucideAngularModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss',

})
export class UpdateProfileComponent implements OnInit {

  updateDataGroup: UntypedFormGroup | any;
  dialogValue: boolean = false;
  private userId!: string;

  constructor(
    private fb: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    // @Inject(MAT_DIALOG_DATA) public dialogData: { selectedUser: ICustomerData }
  ) {
    this.updateDataGroup = this.fb.group({
      firstName: new UntypedFormControl('', Validators.required),
      lastName: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      address: new UntypedFormControl('', Validators.required),
      address2: new UntypedFormControl(''),
      city: new UntypedFormControl('', Validators.required),
      zipCode: new UntypedFormControl('', Validators.required),
      country: new UntypedFormControl(''),
      state: new UntypedFormControl(''),
      phoneNumber: new UntypedFormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      birthday: new UntypedFormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (data: ParamMap) => {
        this._getUserData(data.get('id'));
        this.userId = String(data.get('id'));
      },
      error: (err) => console.log(err)
    })
    // const DATA: any = this.dialogData.selectedUser;
    // if (DATA) {
    //   this.dialogValue = true;
    //   this._getUserData(DATA?._id);
    // } else {
    //   this.dialogValue = false;
    // }
  }

  _getUserData(id: string | null) {
    if (id) {
      this.api.get(`/api/customers/${id}`, true).then((response) => {
        if (response?.status === 'ok') {
          _.map(_.keys(response?.data), (r) => {
            this.updateDataGroup.get(r)?.setValue(response?.data[r])
          });
        }
      }).catch((err) => {
        console.log(err, 'err - err - err - err- err - err - err');
      })
    }
  }

  _handleUpdate({ data, country, state }: { data: UntypedFormGroup, country: string, state: string }) {
    this.api.put(`/api/customers/${this.userId}`, { ...data?.value, country, state }).then((res) => {
      if (res?.status === "ok") {
        this.router.navigateByUrl('/listing');
      }
    }).catch((err) => {
      console.log('VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', err);
    });
  }


}
