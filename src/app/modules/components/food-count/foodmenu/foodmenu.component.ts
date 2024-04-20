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
      "image": "1.jpg",
      "price": 65,
    },
    {
      "id": "1001",
      "code": "nvklal433",
      "name": "Banana Fry",
      "description": "Banana, Corn Flour Batter",
      "image": "2.jpg",
      "price": 72,
    },
    {
      "id": "1002",
      "code": "zz21cz3c1",
      "name": "Salad",
      "description": "Cucumber, Carrot, Wheat Roll",
      "image": "3.jpg",
      "price": 79,
    },
    {
      "id": "1003",
      "code": "244wgerg2",
      "name": "Chicken Strips",
      "description": "Chicken",
      "image": "4.jpg",
      "price": 29,
    },
    {
      "id": "1004",
      "code": "h456wer53",
      "name": "Chicken Nuggets",
      "description": "Chicken",
      "image": "5.jpg",
      "price": 15,
    },
    {
      "id": "1005",
      "code": "av2231fwg",
      "name": "Chicken Roll",
      "description": "Chicken",
      "image": "6.jpg",
      "price": 120,
    },
    {
      "id": "1006",
      "code": "bib36pfvm",
      "name": "Potato Fry",
      "description": "Potato",
      "image": "7.jpg",
      "price": 32,
    },
    {
      "id": "1007",
      "code": "mbvjkgip5",
      "name": "Rusks",
      "description": "Rice FLour",
      "image": "8.jpg",
      "price": 34,
    },
    {
      "id": "1008",
      "code": "vbb124btr",
      "name": "Samosa",
      "description": "Maida Batter, Masala",
      "image": "9.jpg",
      "price": 99,
    },
    {
      "id": "1009",
      "code": "cm230f032",
      "name": "Bread Pakoda",
      "description": "Bread, Maida Batter",
      "image": "10.jpg",
      "price": 299,
    },
    {
      "id": "1000",
      "code": "f230fh0g3",
      "name": "Dosa Sambar",
      "description": "Rice Flour Batter",
      "image": "1.jpg",
      "price": 65,
    },
    {
      "id": "1011",
      "code": "nvklal433",
      "name": "Banana Fry",
      "description": "Banana, Corn Flour Batter",
      "image": "2.jpg",
      "price": 72,
    },
    {
      "id": "1012",
      "code": "zz21cz3c1",
      "name": "Salad",
      "description": "Cucumber, Carrot, Wheat Roll",
      "image": "3.jpg",
      "price": 79,
    },
    {
      "id": "1013",
      "code": "244wgerg2",
      "name": "Chicken Strips",
      "description": "Chicken",
      "image": "4.jpg",
      "price": 29,
    },
    {
      "id": "1014",
      "code": "h456wer53",
      "name": "Chicken Nuggets",
      "description": "Chicken",
      "image": "5.jpg",
      "price": 15,
    },
    {
      "id": "1015",
      "code": "av2231fwg",
      "name": "Chicken Roll",
      "description": "Chicken",
      "image": "6.jpg",
      "price": 120,
    },
    {
      "id": "1016",
      "code": "bib36pfvm",
      "name": "Potato Fry",
      "description": "Potato",
      "image": "7.jpg",
      "price": 32,
    },
    {
      "id": "1017",
      "code": "mbvjkgip5",
      "name": "Rusks",
      "description": "Rice FLour",
      "image": "8.jpg",
      "price": 34,
    },
    {
      "id": "1018",
      "code": "vbb124btr",
      "name": "Samosa",
      "description": "Maida Batter, Masala",
      "image": "9.jpg",
      "price": 99,
    },
    {
      "id": "1019",
      "code": "cm230f032",
      "name": "Bread Pakoda",
      "description": "Bread, Maida Batter",
      "image": "10.jpg",
      "price": 299,
    },
    {
      "id": "1020",
      "code": "zz21cz3c1",
      "name": "Salad",
      "description": "Cucumber, Carrot, Wheat Roll",
      "image": "3.jpg",
      "price": 79,
    },
    {
      "id": "1021",
      "code": "244wgerg2",
      "name": "Chicken Strips",
      "description": "Chicken",
      "image": "4.jpg",
      "price": 29,
    },
    {
      "id": "1022",
      "code": "h456wer53",
      "name": "Chicken Nuggets",
      "description": "Chicken",
      "image": "5.jpg",
      "price": 15,
    },
    {
      "id": "1023",
      "code": "av2231fwg",
      "name": "Chicken Roll",
      "description": "Chicken",
      "image": "6.jpg",
      "price": 120,
    },
    {
      "id": "1024",
      "code": "bib36pfvm",
      "name": "Potato Fry",
      "description": "Potato",
      "image": "7.jpg",
      "price": 32,
    },
    {
      "id": "1025",
      "code": "mbvjkgip5",
      "name": "Rusks",
      "description": "Rice FLour",
      "image": "8.jpg",
      "price": 34,
    },
    {
      "id": "1026",
      "code": "cm230f032",
      "name": "Bread Pakoda",
      "description": "Bread, Maida Batter",
      "image": "10.jpg",
      "price": 299,
    },
    {
      "id": "1027",
      "code": "f230fh0g3",
      "name": "Dosa Sambar",
      "description": "Rice Flour Batter",
      "image": "1.jpg",
      "price": 65,
    },
    {
      "id": "1028",
      "code": "nvklal433",
      "name": "Banana Fry",
      "description": "Banana, Corn Flour Batter",
      "image": "2.jpg",
      "price": 72,
    },
    {
      "id": "1029",
      "code": "zz21cz3c1",
      "name": "Salad",
      "description": "Cucumber, Carrot, Wheat Roll",
      "image": "3.jpg",
      "price": 79,
    },
    {
      "id": "1030",
      "code": "244wgerg2",
      "name": "Chicken Strips",
      "description": "Chicken",
      "image": "4.jpg",
      "price": 29,
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
