export interface Food {
  userName: string;
  foodName: string;
  quantity: number;
}

export interface FoodOrderResponse {
  data: FoodCheckoutResponse[];
  status: string;
  message: string;
}

export interface FoodCheckoutRequest {
  date: string;
  user: string;
  foodItemWithQuantity: foodItemWithQuantity;
}

export interface FoodCheckoutResponse {
  date: string;
  user: string;
  foodItemWithQuantity: foodItemWithQuantity;
  status: string | null;
  message: string | null;
}

export interface FoodVendorResponse {
  data: foodItemWithQuantity;
  status: string | null;
  message: string | null;
}

export interface foodItemWithQuantity {
  [key: string]: number;
}
