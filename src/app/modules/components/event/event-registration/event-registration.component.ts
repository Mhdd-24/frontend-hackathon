import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrl: './event-registration.component.scss'
})
export class EventRegistrationComponent {
  category = [
    { label: 'New Year', value: 'New Year' },
    { label: 'Pongal', value: 'Pongal' },
    { label: 'Valentine Day', value: 'Valentine Day' },
    { label: 'Holi', value: 'Holi' },
    { label: 'Ramzan', value: 'Ramzan' },
    { label: 'Holi', value: 'Holi' },
    { label: 'Christmas', value: 'Christmas' },
    { label: 'Diwali', value: 'Diwali' },
    { label: 'Onam', value: 'Onam' },
  ];
  workshopCategory = [
    { name: 'FlagShip' },
    { name: 'Gold' },
    { name: 'Silver' },
  ];
  profitLossOptions = [
    { label: 'Profit', value: 'profit' },
    { label: 'Loss', value: 'loss' }
  ];
  dropdownItems = [
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
  ];
  selectedState: any = null;
  loading: boolean = false;
  iecForm !: FormGroup;
  isIECFound: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
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



  onUpload(event: any) {
    const file = event.files[0];
    this.iecForm.get('file')?.setValue(file);
  }


  load() {
    this.loading = true;
    // const iecFormData: IecMaster = {
    //   iecNumber: this.iecForm.value.iceNumber,
    //   importerName: this.iecForm.value.importerName,
    //   gstNumber: this.iecForm.value.gstNumber,
    //   panNumber: this.iecForm.value.panNumber,
    //   email: this.iecForm.value.importerEmailId,
    //   phone: this.iecForm.value.phoneNumber,
    //   headOfficeAddress: this.iecForm.value.HOAddress,
    //   active: true,
    //   iecmasters: this.iecForm.value.branches
    // }
    // console.log(this.iecForm.value, iecFormData);

    // this.iecService.newIecData(iecFormData).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     this.loading = false;
    //     this.resetForm();
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     this.loading = false;
    //   }
    // })

  }

  resetForm() {
    this.iecForm.reset();
    console.log('Form reset');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.iecForm.controls;
  }

  checkError = (controlName: string, errorName: string) => {
    return this.iecForm.controls[controlName].hasError(errorName) && this.iecForm.controls[controlName].dirty;
  }

  searchIEC() {
    this.isIECFound = true;
  }

}

