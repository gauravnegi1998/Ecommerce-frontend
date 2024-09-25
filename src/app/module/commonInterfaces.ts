export interface ICountryStateError {
    countryError: string;
    stateError: string
}


export interface ICustomerData {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    country: string;
    state: string;
    city: string;
    password: string;
    birthday: string;
    zipCode: string;
    isUserLogin: boolean;
    address2: string;
    role?: string;
    profileImage: string;
}


export interface IPostReviewData {
    id?: string;
    productId: string;
    ratingNumber: number;
    ratingMessage: string;
    subject: string
}

export interface IReviewData extends IPostReviewData {
    _id: string;
    customer: ICustomerData;
    createdAt: Date
}

// review Update and Post payload interface

export interface IReviewUpdateAndPostPayload {
    id: string,
    data: IPostReviewData;
}

export interface IProductData {
    _id: string;
    name: string;
    itemId: string;
    normalImage: string
    largeImage: string;
    mediumImage: string;
    smallImage: string;
    itemCode: string;
    hideFromAdmin: boolean;
    hideFromWeb: boolean;
    returnPolicy: string;
    isEligibleForAutoOrder: boolean;
    webCategories: { _id: string; categoryId: number; categoryName: string }[];
    reviews: IReviewData[] | [];
    description: string;
    price: {
        normalPrice: string;
        offerPrice: string;
    };
    avaliableStock: number;
    minimumOrderQuantity: number;
}


export interface IProductDataQty extends IProductData {
    quantity: number;
}


export interface IAddToCart {
    productID: string;
    quantity: number;
}


export interface ICartData {
    _id: string;
    name: string;
    productId: string,
    itemId: number;
    normalImage: string;
    largeImage?: string,
    mediumImage?: "";
    smallImage?: "";
    itemCode: string;
    description: string;
    quantity: number,
    price: string,
    shortName: string
};