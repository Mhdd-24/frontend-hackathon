import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EventDetailsProduct } from "../../../../../assets/data/DetailsProducts";


interface EventDetails {
  id: number;
  workshopName: string;
  workshopCategory: string;
  eventCategory: string;
  studentEventRegister: number;
  hallBookingID: string;
  studentAmount: number;
}

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class EventDetailsComponent {
  productDialog: boolean = false;
  eventDetailsProducts!: EventDetailsProduct[];
  eventDetailsProduct!: EventDetailsProduct;
  eventDetailsSelectedProducts!: EventDetailsProduct[] | null;
  submitted: boolean = false;

  EventDetails!: EventDetails;
  EventDetailsData: EventDetails[] = [
    {
      id: 1,
      workshopName: "Home Ing",
      hallBookingID: "167 Doe Crossing Way",
      workshopCategory: "Flag Ship",
      eventCategory: "National Day",
      studentEventRegister: 263,
      studentAmount: 909.07
    }, 
    {
      id: 2,
      workshopName: "Namfix",
      hallBookingID: "27 Jay Alley",
      workshopCategory: "Gold",
      eventCategory: "Onam",
      studentEventRegister: 16,
      studentAmount: 725.68
    }, 
    {
      id: 3,
      workshopName: "bree",
      hallBookingID: "763 Rigney Drive",
      workshopCategory: "Silver",
      eventCategory: "Ramzan",
      studentEventRegister: 141,
      studentAmount: 376.97
    },
     {
      id: 4,
      workshopName: 'grown',
      hallBookingID: "53 Glendale Center",
      workshopCategory: "Flag Ship",
      eventCategory: "Diwali",
      studentEventRegister: 329,
      studentAmount: 344.62
    }, {
      id: 5,
      workshopName: "Solarbreeze",
      hallBookingID: "1 Eastlawn Circle",
      workshopCategory: "Flag Ship",
      eventCategory: "Onam",
      studentEventRegister: 295,
      studentAmount: 466.71
    }, {
      id: 6,
      workshopName: "Biodex",
      hallBookingID: "85 Pond Lane",
      workshopCategory: "Silver",
      eventCategory: "National Day",
      studentEventRegister: 78,
      studentAmount: 392.43
    }, {
      id: 7,
      workshopName: "Lotlux",
      hallBookingID: "6380 Milwaukee Terrace",
      workshopCategory: "Flag Ship",
      eventCategory: "Holi",
      studentEventRegister: 397,
      studentAmount: 786.76
    }, {
      id: 8,
      workshopName: "Stim",
      hallBookingID: "522 Delladonna Road",
      workshopCategory: "Silver",
      eventCategory: "Onam",
      studentEventRegister: 301,
      studentAmount: 533.7
    }, {
      id: 9,
      workshopName: "Quo Lux",
      hallBookingID: "283 Veith Place",
      workshopCategory: "Gold",
      eventCategory: "Valentine Day",
      studentEventRegister: 301,
      studentAmount: 895.59
    }, {
      id: 10,
      workshopName: "Pannier",
      hallBookingID: "4235 Independence Lane",
      workshopCategory: "Gold",
      eventCategory: "Holi",
      studentEventRegister: 133,
      studentAmount: 714.41
    }, {
      id: 11,
      workshopName: "Flexidy",
      hallBookingID: "0 Blaine Center",
      workshopCategory: "Silver",
      eventCategory: "Holi",
      studentEventRegister: 347,
      studentAmount: 480.08
    }, {
      id: 12,
      workshopName: "Redhold",
      hallBookingID: "5 Sundown Drive",
      workshopCategory: "Flag Ship",
      eventCategory: "New Year",
      studentEventRegister: 226,
      studentAmount: 641.23
    }, {
      id: 13,
      workshopName: "Tin",
      hallBookingID: "95373 Mayfield Parkway",
      workshopCategory: "Gold",
      eventCategory: "National Day",
      studentEventRegister: 135,
      studentAmount: 724.06
    }, {
      id: 14,
      workshopName: "Ventosanzap",
      hallBookingID: "624 Tony Hill",
      workshopCategory: "Silver",
      eventCategory: "National Day",
      studentEventRegister: 338,
      studentAmount: 931.17
    }, {
      id: 15,
      workshopName: "Pannier",
      hallBookingID: "027 Myrtle Plaza",
      workshopCategory: "Silver",
      eventCategory: "Christmas",
      studentEventRegister: 228,
      studentAmount: 580.31
    }, {
      id: 16,
      workshopName: "Konklab",
      hallBookingID: "3973 Clove Avenue",
      workshopCategory: "Silver",
      eventCategory: "New Year",
      studentEventRegister: 379,
      studentAmount: 731.77
    }, {
      id: 17,
      workshopName: "Cardguard",
      hallBookingID: "18233 Fallview Hill",
      workshopCategory: "Silver",
      eventCategory: "Onam",
      studentEventRegister: 111,
      studentAmount: 452.07
    }, {
      id: 18,
      workshopName: "Span",
      hallBookingID: "1892 1st Court",
      workshopCategory: "Gold",
      eventCategory: "Pongal",
      studentEventRegister: 54,
      studentAmount: 777.52
    }, {
      id: 19,
      workshopName: "Rank",
      hallBookingID: "183 Judy Trail",
      workshopCategory: "Silver",
      eventCategory: "National Day",
      studentEventRegister: 60,
      studentAmount: 400.8
    }, {
      id: 20,
      workshopName: "Vagram",
      hallBookingID: "3 Claremont Plaza",
      workshopCategory: "Silver",
      eventCategory: "Holi",
      studentEventRegister: 325,
      studentAmount: 475.63
    }, {
      id: 21,
      workshopName: "Holdlamis",
      hallBookingID: "1 Dryden Drive",
      workshopCategory: "Flag Ship",
      eventCategory: "Valentine Day",
      studentEventRegister: 83,
      studentAmount: 652.65
    }, {
      id: 22,
      workshopName: "Namfix",
      hallBookingID: "964 Fordem Pass",
      workshopCategory: "Gold",
      eventCategory: "Ramzan",
      studentEventRegister: 12,
      studentAmount: 545.32
    }, {
      id: 23,
      workshopName: "Zaam-Dox",
      hallBookingID: "2326 Straubel Street",
      workshopCategory: "Silver",
      eventCategory: "Valentine Day",
      studentEventRegister: 34,
      studentAmount: 886.68
    }, {
      id: 24,
      workshopName: "Bitchip",
      hallBookingID: "763 Lighthouse Bay Place",
      workshopCategory: "Silver",
      eventCategory: "Christmas",
      studentEventRegister: 314,
      studentAmount: 529.96
    }, {
      id: 25,
      workshopName: "Pannier",
      hallBookingID: "03479 Prairieview Point",
      workshopCategory: "Silver",
      eventCategory: "Onam",
      studentEventRegister: 331,
      studentAmount: 811.19
    }, {
      id: 26,
      workshopName: "Sonsing",
      hallBookingID: "7575 Russell Junction",
      workshopCategory: "Gold",
      eventCategory: "Onam",
      studentEventRegister: 52,
      studentAmount: 755.09
    }, {
      id: 27,
      workshopName: "Tin",
      hallBookingID: "9 Mandrake Park",
      workshopCategory: "Flag Ship",
      eventCategory: "Diwali",
      studentEventRegister: 331,
      studentAmount: 439.1
    }, {
      id: 28,
      workshopName: "Mat Lam Tam",
      hallBookingID: "07166 Reinke Parkway",
      workshopCategory: "Flag Ship",
      eventCategory: "Christmas",
      studentEventRegister: 311,
      studentAmount: 733.53
    }, {
      id: 29,
      workshopName: "Voyatouch",
      hallBookingID: "49101 Rigney Circle",
      workshopCategory: "Flag Ship",
      eventCategory: "National Day",
      studentEventRegister: 166,
      studentAmount: 775.47
    }, {
      id: 30,
      workshopName: "Namfix",
      hallBookingID: "5 Dennis Place",
      workshopCategory: "Gold",
      eventCategory: "New Year",
      studentEventRegister: 313,
      studentAmount: 629.73
    }
  ]


  constructor(private messageService: MessageService, private confirmationService: ConfirmationService) { }

  editProduct(eventDetailsProduct: EventDetails) {
    console.log({ ...eventDetailsProduct });
    this.EventDetails = { ...eventDetailsProduct };
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.eventDetailsProduct.workshopName?.trim()) {
      if (this.eventDetailsProduct.hallBookingID) {
        this.eventDetailsProducts[this.findIndexById(this.eventDetailsProduct.hallBookingID)] = this.eventDetailsProduct;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.eventDetailsProduct.hallBookingID = this.createId();
        this.eventDetailsProduct.image = 'product-placeholder.svg';
        this.eventDetailsProducts.push(this.eventDetailsProduct);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.eventDetailsProducts = [...this.eventDetailsProducts];
      this.productDialog = false;
      this.eventDetailsProduct = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.eventDetailsProducts.length; i++) {
      if (this.eventDetailsProducts[i].hallBookingID === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  get calculateTotalQty() {
    let total = 0;
    for (let qty of this.EventDetailsData) {
      total += qty.id;
    }
    return total
  }
}
