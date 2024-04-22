import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { Food, SelectItem } from '../models/foodmenu.models';
import { DataView } from 'primeng/dataview';
import { ToastService } from '../../../services/toast.service';
import { FoodService } from "../services/food-count.service";
import { FoodCheckoutRequest } from '../models/fooddetails.models';

@Component({
  selector: 'app-food-menu',
  templateUrl: './foodmenu.component.html',
  styleUrls: ['./foodmenu.component.scss']
})
export class FoodMenuComponent {
  foods: Food[] = [
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Dosa Sambar",
      "description": "Rice Flour Batter",
      "image": "Dosa.jpg",
      "price": 65,
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Idli",
      "description": "Rice Flour Batter",
      "image": "Idli.jpg",
      "price": 30,
    },
    {
      "id": "1002",
      "code": "zz21cz3c1",
      "name": "Panner Masala",
      "description": "Panner, Butter, Masala",
      "image": "PannerMasala.jpg",
      "price": 100,
    },
    {
      "id": "1003",
      "code": "244wgerg2",
      "name": "Samosa",
      "description": "Maida Flour Batter",
      "image": "Samosa.jpg",
      "price": 25,
    },
    {
      "id": "1004",
      "code": "h456wer53",
      "name": "AaloRoti",
      "description": "Roti, Aalo Masala",
      "image": "AaloRoti.jpg",
      "price": 10,
    },
    {
      "id": "1005",
      "code": "av2231fwg",
      "name": "FrenchFries",
      "description": "Aalo Fry, Sauce",
      "image": "FrenchFries.jpg",
      "price": 75,
    },
    {
      "id": "1006",
      "code": "bib36pfvm",
      "name": "Fruits Salad",
      "description": "Fruits",
      "image": "FruitsSalad.jpg",
      "price": 60,
    },
    {
      "id": "1007",
      "code": "mbvjkgip5",
      "name": "Dal Masala",
      "description": "Dal",
      "image": "Dal.jpg",
      "price": 50,
    },
    {
      "id": "1008",
      "code": "vbb124btr",
      "name": "Cake",
      "description": "Eggless, Creamy",
      "image": "Cake.jpg",
      "price": 45,
    },
    {
      "id": "1009",
      "code": "cm230f032",
      "name": "Chicken Strips",
      "description": "Chicken, Bread",
      "image": "ChickenStrips.jpg",
      "price": 120,
    },
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Pasta",
      "description": "Pasta, Vegetables",
      "image": "Pasta.jpg",
      "price": 100,
    },
    {
      "id": "1011",
      "code": "nvklal433",
      "name": "Tamarind Rice",
      "description": "Tamarind, Rice",
      "image": "TamarindRice.jpg",
      "price": 45,
    },
    {
      "id": "1012",
      "code": "zz21cz3c1",
      "name": "Chicken Burger",
      "description": "Chicken, Bread, Salad",
      "image": "Burger.jpg",
      "price": 90,
    },
    {
      "id": "1013",
      "code": "244wgerg2",
      "name": "Chicken Briyani",
      "description": "Chicken, Rice",
      "image": "Briyani.jpg",
      "price": 120,
    },
    {
      "id": "1014",
      "code": "h456wer53",
      "name": "Gulab Jamun",
      "description": "Gulab Wheat Batter, Sugar",
      "image": "GulabJamun.jpg",
      "price": 15,
    },
    {
      "id": "1015",
      "code": "av2231fwg",
      "name": "Vada Pav",
      "description": "Bread, Aalo, Chilli",
      "image": "VadaPav.jpg",
      "price": 20,
    },
    {
      "id": "1016",
      "code": "bib36pfvm",
      "name": "Pani Puri",
      "description": "Masala Water, Aalo",
      "image": "PaniPuri.jpg",
      "price": 25,
    },
    {
      "id": "1017",
      "code": "mbvjkgip5",
      "name": "Veg Pulao",
      "description": "Rice, Vegetables",
      "image": "VegPulao.jpg",
      "price": 40,
    },
    {
      "id": "1018",
      "code": "vbb124btr",
      "name": "Porotta",
      "description": "Maida Batter",
      "image": "Porotta.jpg",
      "price": 12,
    },
    {
      "id": "1019",
      "code": "cm230f032",
      "name": "Chenna Masala",
      "description": "Chenna",
      "image": "ChennaMasala.jpg",
      "price": 85,
    },
    {
      "id": "1020",
      "code": "zz21cz3c1",
      "name": "Chai",
      "description": "Milk, Sugar, Tea Powder",
      "image": "Chai.jpg",
      "price": 10,
    },
    {
      "id": "1021",
      "code": "244wgerg2",
      "name": "Unlimited Veg Meals",
      "description": "Variety Masala, Rice, Papads, Sweets",
      "image": "VegMeals.jpg",
      "price": 150,
    },
    {
      "id": "1022",
      "code": "h456wer53",
      "name": "Breakfast Combo",
      "description": "Idli, Vada, Banana",
      "image": "BreakfastCombo.jpg",
      "price": 75,
    },
    {
      "id": "1023",
      "code": "av2231fwg",
      "name": "Orange Juice",
      "description": "Orange",
      "image": "OrangeJuice.jpg",
      "price": 50,
    },
    {
      "id": "1024",
      "code": "bib36pfvm",
      "name": "Green Apple Juice",
      "description": "Apple",
      "image": "GreenAppleJuice.jpg",
      "price": 60,
    },
    {
      "id": "1025",
      "code": "MilkShake",
      "name": "Rusks",
      "description": "Milk, Fruits",
      "image": "MilkShake.jpg",
      "price": 55,
    },
    {
      "id": "1026",
      "code": "cm230f032",
      "name": "Corn Strips",
      "description": "Corn, Maida Batter",
      "image": "CornStrips.jpg",
      "price": 40,
    },
    {
      "id": "1027",
      "code": "f230fh0g3",
      "name": "Cookies",
      "description": "Rice Flour Batter",
      "image": "Cookies.jpg",
      "price": 5,
    },
    {
      "id": "1028",
      "code": "nvklal433",
      "name": "Egg",
      "description": "Egg",
      "image": "Egg.jpg",
      "price": 20,
    },
    {
      "id": "1029",
      "code": "zz21cz3c1",
      "name": "Chapathi",
      "description": "Wheat Flour Batter",
      "image": "Chapathi.jpg",
      "price": 10,
    },
    {
      "id": "1030",
      "code": "244wgerg2",
      "name": "Sandwich",
      "description": "Bread, Salad",
      "image": "Sandwich.jpg",
      "price": 55,
    }
  ]

  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField: string = '';
  disabledbutton: boolean = false;

  constructor(
    private toastService: ToastService,
    private foodService: FoodService,
    private authService: AuthService
  ) {}

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }

  checkout(): void {
    const currentTime = new Date();
    const closingTime = new Date(currentTime);
    closingTime.setHours(11, 0, 0, 0);
  
    if (currentTime > closingTime) {
      this.disabledbutton = true;
      this.toastService.showErrorToast('Error', 'Orders are closed for the day.');
      return;
    }
  
    const itemsInCart = this.foods.filter(food => food.quantity && food.quantity > 0);
  
    if (itemsInCart.length > 0) {
      const foodItemWithQuantity: { [id: string]: number } = {};
  
      for (const food of itemsInCart) {
        foodItemWithQuantity[food.name] = food.quantity || 0;
      }
      
      const today = new Date();
      const day = today.getDate().toString().padStart(2, '0');
      const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
      const year = today.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
  
      const foodCheckout: FoodCheckoutRequest = {
        date: formattedDate,
        user: this.authService.currentUser?.email as string ,
        foodItemWithQuantity: foodItemWithQuantity
      };
  
      this.foodService.checkoutFood(foodCheckout).subscribe({
        next: (response: FoodCheckoutRequest) => {
          console.log('Checkout Response:', response);
          for (const food of itemsInCart) {
            food.quantity = 0;
          }
          this.toastService.showSuccessToast('Success', 'Food order placed successfully!');
        },
        error: (error: any) => {
          console.log('Error occurred during checkout:', error);
          this.toastService.showErrorToast('Error', 'An error occurred during checkout.');
        }
      });
    } else {
      this.toastService.showErrorToast('Error', 'Please add items to the cart before checkout.');
    }
  }
  
  addQuantity(food: Food): void {
    food.quantity = (food.quantity || 0) + 1;
  }

  deleteQuantity(food: Food): void {
    if (food.quantity && food.quantity > 0) {
      food.quantity--;
    }
  }
}
