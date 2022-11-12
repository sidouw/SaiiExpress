export interface IUser {
    fullname: string
    email: string
    role: string
    photo?: string
    _id: string
    createdAt: string
    updatedAt: string
    phonenumber: string
    __v: number
    cart:ICartItem[]
    whishlist:IWhishListItem[]
    shippingadresses:IShippingAdress[]
  }

  export interface IRegisterUser {
    fullname: string
    email: string
    password: string
  }  
  export interface ILoginUser {
    email: string
    password: string
  }
  
  export interface GenericResponse {
    status: string;
    message: string;
  }
  
  export interface ILoginResponse {
    user: IUser;
    token: string;
  }

  export interface IUpdateUserInfo{
    fullname:string
    phonenumber:string
  }

  export interface IUpdateUserEmail{
    email:string
  }

  export interface IUpdateUserPassword{
    currentpassword:string
    newpassword:string
  }

  
export interface IShippingAdress {
  fullname:string
  phonenumber:string
  adress1:string
  adress2:string
  country:string
  city:string
  state:string
  zip:number
  default:boolean
}  

export interface IProduct {
  _id:string
  name:string
  description:string
  orders:number
  rating:number
  category:string
  tags:string[]
  image:{
    link:string
    blur:string
  }
  skus:[
    {   
      name:String
      images:string[]
      qty:number
      price:number
  }
  ]
}


export interface ICartItem {
  product:string
  sku:number
  qty:number
}

export interface ISearchPage {
  products:IProduct[]
  totalProducts:number
  skip:number
}

export interface IWhishListItem {
  product:string
}

