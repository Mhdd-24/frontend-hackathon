import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Product } from '../models/eventVolunteer.model';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-suggest-event',
  templateUrl: './suggest-event.component.html',
  styleUrl: './suggest-event.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class SuggestEventComponent {
  iecForm !: FormGroup;
  isIECFound: boolean = false;
  loading: boolean = false;
  productDialog: boolean = false;

  products: Product[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Football Event',
      description: 'Football is one of the oldest sports globally, which is played between two teams using only one football.',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
  ];

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(
    private formBuilder: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.iecForm = this.formBuilder.group({
      iceNumber: new FormControl<string | null>("IEC1234", [Validators.required]),
      workshopName: ['', Validators.required],
      registerstudent: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      selectedCategory: [null, Validators.required],
      workshopCategory: [null, Validators.required],
      amountperstudent: [null, [Validators.required, Validators.min(0)]],
      expense: ['', [Validators.required, Validators.min(0)]],
      selectedProfitLoss: ['', Validators.required],
      halleventbooking: [null, Validators.required],
      remarks: ['', Validators.required],
      branches: this.formBuilder.array([
        this.formBuilder.group({
          branchCode: new FormControl<string | null>(null),
          branchName: new FormControl<string | null>("Culcutta"),
          branchAddress: new FormControl<string | null>(null),
          active: new FormControl<boolean | null>(null)
        })
      ])
    })

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  get branches(): FormArray {
    return this.iecForm.get("branches") as FormArray
  }

  newBranch() {
    this.branches.push(
      this.formBuilder.group({
        branchCode: new FormControl<string | null>(null),
        branchName: new FormControl<string | null>(null),
        branchAddress: new FormControl<string | null>(null),
        active: new FormControl<boolean | null>(null)
      })
    )
  }


  removeBranch(branchIndex: number) {
    this.branches.removeAt(branchIndex);
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
        this.selectedProducts = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
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

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'NONE';
    }
  }






}
