export interface Food {
  userName?: string;
  foodName?: string;
  quantity?: number;
}

export interface FoodDetailsResponse {
  foods: Food[];
}

export interface FoodSaveResponse {
  foodId: string;
  status: string;
  message: string;
}
