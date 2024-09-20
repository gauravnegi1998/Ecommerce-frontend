import { Component, inject, OnInit } from '@angular/core';
import { InputModules } from '../../../../inputs/inputs.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductsServices } from '../../../../../services/ProductsServices.service';
import { IProductDataQty, IReviewData, IReviewUpdateAndPostPayload } from '../../../../module/commonInterfaces';
import _, { round } from 'lodash';
import { PipesModules } from '../../../../pipes/pipes.module';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { Icons } from '../../../../Common/Icons';
import { AuthServices } from '../../../../../services/AuthServices.service';
import { debounceTime, Subject } from 'rxjs';
import { _cartAddFunctions } from '../../../../Common/cartCommonFunction';

@Component({
  selector: 'app-single-product-page',
  standalone: true,
  imports: [InputModules, CommonModule, PipesModules, LucideAngularModule],
  templateUrl: './single-product-page.component.html',
  styleUrl: './single-product-page.component.scss',
  providers: [
    { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(Icons) }
  ]
})
export class SingleProductPageComponent extends _cartAddFunctions implements OnInit {

  singleProductData: IProductDataQty | any = {};
  activeReview: boolean = false;
  editActive: string = "";
  ratingAdded: number[] = [];
  FeelAboutRating: string = ""
  ratingText: string = "";
  ratingSubject: string = "";
  ErrorMsg: string = "";

  private callProductApi = new Subject();
  private auth = inject(AuthServices);

  constructor(private activeRoute: ActivatedRoute, private productService: ProductsServices) {
    super();
    this.callProductApi.pipe(debounceTime(500)).subscribe((r) => {
      this._getSingleProductData()
    })
  }


  isUserLogin: string = "";


  ngOnInit(): void {
    this._getSingleProductData();
    this.auth.observable$.subscribe((user) => {
      this.isUserLogin = user ? user?._id : "";
    })
  }

  // Api's call during page load 

  _getSingleProductData() {
    this.activeRoute.paramMap.subscribe({
      next: (data) => {
        const ID = data.get('id') || "";
        this.productService._getSingleProduct(ID, (response) => {
          console.log('respose', response);
          this.singleProductData = { ...response.data, quantity: 1 };
        })
      },
      error: (err) => console.log(err)
    })

  }

  _getProductsReview() {
    // this.productService._getReviews(this.singleProductData?._id)
  }


  _arrayConverter(data: number | undefined) {
    if (data) {
      const COUNTING_ARRAY = _.range(1, data + 1);
      return COUNTING_ARRAY;
    }
    return [];
  }

  _handleQty(action: string) {
    let QTY = this.singleProductData['quantity'];
    if (action === 'sub') {
      QTY = (QTY - 1 > 0) ? (QTY - 1) : 1;
    } else {
      QTY = ((QTY + 1) < this.singleProductData.minimumOrderQuantity) ? (QTY + 1) : this.singleProductData.minimumOrderQuantity;
    }
    this.singleProductData['quantity'] = QTY;
  }

  _ratingCheck(i: number) {
    let Rating = _.includes(this.ratingAdded, i) ? this.ratingAdded.splice(0, (i - 1)) : _.range(1, (i + 1))
    let Text = "";
    switch (Rating?.length) {
      case 1:
        Text = "Very Poor";
        break;
      case 2:
        Text = "Poor";
        break;
      case 3:
        Text = "Good";
        break;
      case 4:
        Text = "Very Good";
        break;
      case 5:
        Text = "Excellent";
        break;
    }
    this.FeelAboutRating = Text;
    this.ratingAdded = Rating;
  }

  //text area onchange function
  _handleTextChange(e: any) {
    this.ratingText = e?.target?.value;
  }

  _handleEditReview(ReviewData: IReviewData) {
    this.editActive = ReviewData._id;
    this.ratingAdded = _.range(1, ReviewData?.ratingNumber + 1);
    this.ratingText = ReviewData.ratingMessage;
    this.ratingSubject = ReviewData.subject;
  }

  // call function on add button click

  _handleReview(action: string, response?: IReviewData) {

    if (action === 'cancel') {
      this.ratingAdded = [];
      this.ratingText = "";
      this.ratingSubject = "";
      this.FeelAboutRating = "";
      this.editActive = "";
      this.activeReview = false;
      this.callProductApi.next(response || null);
    } else {

      let ReviewData = {
        productId: this.singleProductData?._id,
        ratingNumber: this.ratingAdded?.length,
        ratingMessage: this.ratingText,
        subject: this.ratingSubject
      };

      if (this.ratingAdded?.length > 0) {
        let _callData = (data: IReviewUpdateAndPostPayload, callback: (data: any) => void) => this.productService._postYourReview(data, callback);
        if (this.editActive) {
          _callData = (data: IReviewUpdateAndPostPayload, callback: (data: any) => void) => this.productService._updateYourReview(data, callback);
        }

        _callData.call(this, { id: this.editActive, data: ReviewData }, (response) => {
          if (response?.status === "ok") {
            this._handleReview('cancel', response);
          }
        })

      } else {
        this.ErrorMsg = 'Please provide the rating';
        setTimeout(() => this.ErrorMsg = "", 2000);
      }
    }

  }

  _deleteReview(id: string, productId: string) {
    this.productService._deleteYourReview(id, productId, (res) => {
      if (res?.status === "ok") {
        this.callProductApi.next('deleted');
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    })
  }


  get discountPercentage(): string {
    return '-' + round(+this.singleProductData?.price?.offerPrice / +this.singleProductData?.price?.normalPrice * 100) + '%'
  }

  _addToCart() {
    this._handleAddToCart([this.singleProductData])
  }

}
