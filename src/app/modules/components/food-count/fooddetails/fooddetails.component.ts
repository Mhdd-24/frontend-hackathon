import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import {  FoodOrderResponse, FoodCheckoutResponse, FoodVendorResponse, foodItemWithQuantity } from './../models/fooddetails.models';
import { FoodService } from '../services/food-count.service';

interface FoodVendorArray {
  itemName: string;
  quantity: number;
}

@Component({
  selector: 'app-fooddetails',
  templateUrl: './fooddetails.component.html',
  styleUrls: ['./fooddetails.component.scss']
})
export class FooddetailsComponent implements OnInit {
  loading: boolean = true;
  foods!: FoodCheckoutResponse[];
  vendors!: FoodVendorResponse;
  vendorOrderData: foodItemWithQuantity = {};
  foodVendorArray: FoodVendorArray[] = [];

  @ViewChild('dt') dt!: Table;

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.fetchFoodOrderList();
    this.fetchFoodVendorList();
  }

  fetchFoodOrderList() {
    this.loading = true;
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const formData = new FormData();
    formData.append('date', formattedDate);

    this.foodService.getFoodOrderList(formData).subscribe({
      next: (foods: FoodOrderResponse) => {
        this.foods = foods.data;
        this.loading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  fetchFoodVendorList() {
    this.loading = true;
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const formData = new FormData();
    formData.append('date', formattedDate);

    this.foodService.getFoodVendorList(formData).subscribe({
      next: (vendors: FoodVendorResponse) => {
        console.log(vendors);
        for (const key in vendors.data) {
          console.log(key)
          this.foodVendorArray.push({ itemName: key, quantity: vendors.data[key] });
        }
        console.log(this.foodVendorArray);
        this.vendors = vendors;
        this.loading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  downloadData() {
    const dataToDownload = this.foodVendorArray;
    const csvData = this.convertToCSV(dataToDownload);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'food_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    return `${header}\n${rows.join('\n')}`;
  }
}
