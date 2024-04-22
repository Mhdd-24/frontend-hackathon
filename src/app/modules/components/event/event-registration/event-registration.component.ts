import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { AttendeesDto, EventRequest, Expenses } from '../models/event.models';
import { EventService } from '../services/event.service';
import { ToastService } from '../../../services/toast.service';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';

interface Department {
  value: string;
  viewValue: string;
}

interface BooleanOption {
  value: boolean;
  viewValue: string;
}

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrl: './event-registration.component.scss',
  providers: [MessageService]
})
export class EventRegistrationComponent {
  @Input() id?: string;
  minDate: Date = new Date();
  loading: boolean = false;
  eventRegisterForm !: FormGroup;
  isIECFound: boolean = false;
  isEditMode = false;
  volunteers: AttendeesDto[] = [];
  attendees: AttendeesDto[] = [];
  attandance: AttendeesDto[] = [];
  totalAttandance: number = 0;
  totalAttanees = 0;
  averageRating = 0;
  pendingBudget = 0;
  uploadedFiles: string[] = [];

  displayCustom: boolean | undefined;

  activeIndex: number = 0;

  images: any[] | undefined =[
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
        alt: 'Description for Image 1',
        title: 'Title 1'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
        alt: 'Description for Image 2',
        title: 'Title 2'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
        alt: 'Description for Image 3',
        title: 'Title 3'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
        alt: 'Description for Image 4',
        title: 'Title 4'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
        alt: 'Description for Image 5',
        title: 'Title 5'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6s.jpg',
        alt: 'Description for Image 6',
        title: 'Title 6'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
        alt: 'Description for Image 7',
        title: 'Title 7'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8s.jpg',
        alt: 'Description for Image 8',
        title: 'Title 8'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9s.jpg',
        alt: 'Description for Image 9',
        title: 'Title 9'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10s.jpg',
        alt: 'Description for Image 10',
        title: 'Title 10'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11s.jpg',
        alt: 'Description for Image 11',
        title: 'Title 11'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12s.jpg',
        alt: 'Description for Image 12',
        title: 'Title 12'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13s.jpg',
        alt: 'Description for Image 13',
        title: 'Title 13'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14s.jpg',
        alt: 'Description for Image 14',
        title: 'Title 14'
    },
    {
        itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg',
        thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15s.jpg',
        alt: 'Description for Image 15',
        title: 'Title 15'
    }
];

  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];



  departments: Department[] = [
    { value: 'HR', viewValue: 'HR' },
    { value: 'IT', viewValue: 'IT' },
    { value: 'Finance', viewValue: 'Finance' },
    { value: 'Web Portals', viewValue: 'Web Portals' },
    { value: 'Mobility', viewValue: 'Mobility' },
    { value: 'Data', viewValue: 'Data' },
    { value: 'Martech', viewValue: 'Martech' },
    { value: 'SFDC', viewValue: 'SFDC' }
  ];

  isVotable: BooleanOption[] = [
    { value: true, viewValue: 'Yes' },
    { value: false, viewValue: 'No' }
  ];

  needVolunteer: BooleanOption[] = [
    { value: true, viewValue: 'Yes' },
    { value: false, viewValue: 'No' }
  ];

  isSnacks: BooleanOption[] = [
    { value: true, viewValue: 'Yes' },
    { value: false, viewValue: 'No' }
  ];



  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.eventRegisterForm = this.formBuilder.group({
      eventName: new FormControl<string | null>(null, [Validators.required]),
      budget: new FormControl<number | null>(null, [Validators.required]),
      eventDescription: new FormControl<string | null>(null, [Validators.required]),
      eventFromDate: new FormControl<Date | null>(null, [Validators.required]),
      eventToDate: new FormControl<Date | null>(null, [Validators.required]),
      eventLocation: new FormControl<string | null>(null, [Validators.required]),
      name: new FormControl<string | null>(null, [Validators.required]),
      department: new FormControl<Department | null>(null, [Validators.required]),
      isVotable: new FormControl<BooleanOption | null>(null, [Validators.required]),
      isSnacks: new FormControl<BooleanOption | null>(null, [Validators.required]),
      needVolunteer: new FormControl<BooleanOption | null>(null, [Validators.required]),
      checkLists: this.formBuilder.array([
        this.formBuilder.group({
          checklistDescription: new FormControl<string | null>(null),
          isCompleted: new FormControl<boolean | null>(false)
        },
        )
      ]),
      expenses: this.formBuilder.array([
        this.formBuilder.group({
          expense: new FormControl<number | null>(null),
          amount: new FormControl<number | null>(null)
        })

      ]),
    })


    this.eventService.getEventById(this.id!).subscribe({
      next: (event) => {
        this.isEditMode = true;
        console.log(event);
        this.eventRegisterForm.patchValue({
          ...event,
          eventFromDate: new Date(event.eventFromDate),
          eventToDate: new Date(event.eventToDate),
          department: this.departments.find(department => department.value === event.department),
          name: event.organizer.name,
          isVotable: this.isVotable.find(votable => votable.value === event.votable),
          isSnacks: this.isSnacks.find(snacks => snacks.value === event.snacks),
          needVolunteer: this.needVolunteer.find(volunteer => volunteer.value === event.needVolunteer),
          expenses: null
        });

        if (event.checkLists.length > 1) {
          for (let i = 1; i < event.checkLists.length; i++) {
            this.checkLists.push(
              this.formBuilder.group({
                checklistDescription: new FormControl<string | null>(event.checkLists[i].checklistDescription),
                isCompleted: new FormControl<boolean | null>(event.checkLists[i].isCompleted)
              })
            )
          }
        }

        if (event.expenses) {
          this.removeExpense(0);
          Object.keys(event.expenses).forEach((key) => {
            this.expenses.push(
              this.formBuilder.group({
                expense: new FormControl<string | null>(key),
                amount: new FormControl<number | null>(event.expenses[key])
              })
            )
          })
        }

        this.volunteers = event.volunteer;
        this.attendees = event.attendees;
        this.attandance = event.attendance;
        this.totalAttandance = event.attendance.length;
        this.totalAttanees = event.attendees.length;
        this.averageRating = event.attendance.reduce((acc, attendee) => acc + parseInt(attendee.rating), 0) / event.attendance.length;
        console.log(this.averageRating);
        this.pendingBudget = event.budget - event.remainingBudget;

        console.log(this.volunteers);


      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  get checkLists(): FormArray {
    return this.eventRegisterForm.get("checkLists") as FormArray
  }

  newBranch() {
    this.checkLists.push(
      this.formBuilder.group({
        checklistDescription: new FormControl<string | null>(null),
        isCompleted: new FormControl<boolean | null>(false)
      })
    )
  }

  newExpense() {
    this.expenses.push(
      this.formBuilder.group({
        expense: new FormControl<number | null>(null),
        amount: new FormControl<number | null>(null)
      })
    )
  }

  get expenses(): FormArray {
    return this.eventRegisterForm.get("expenses") as FormArray
  }

  removeExpense(expenseIndex: number) {
    this.expenses.removeAt(expenseIndex);
  }


  removeBranch(branchIndex: number) {
    this.checkLists.removeAt(branchIndex);
  }



  onUpload(event: any) {
    const file = event.files[0];
    this.eventRegisterForm.get('file')?.setValue(file);
  }


  load() {
    this.loading = true;
    console.log("Form Values", this.eventRegisterForm.value);
    let expensesObj: any = {}
    this.eventRegisterForm.value.expenses.forEach((expense: any) => {
      expensesObj[expense.expense] = expense.amount;
    })

    console.log(expensesObj);

    const eventFormData: EventRequest = {
      eventName: this.eventRegisterForm.value.eventName,
      eventDescription: this.eventRegisterForm.value.eventDescription,
      eventFromDate: this.eventRegisterForm.value.eventFromDate,
      eventToDate: this.eventRegisterForm.value.eventToDate,
      eventLocation: this.eventRegisterForm.value.eventLocation,
      organizer: {
        empid: "",
        name: this.eventRegisterForm.value.name,
        email: '',
      },
      department: this.eventRegisterForm.value.department.value,
      eventType: "Internal",
      budget: this.eventRegisterForm.value.budget,
      eventEndTime: "",
      eventStartTime: "",
      isInvitationRequired: false,
      isSnacks: this.eventRegisterForm.value.isSnacks.value,
      isVotable: this.eventRegisterForm.value.isVotable.value,
      maxAttendees: 100,
      needVolunteer: this.eventRegisterForm.value.needVolunteer.value,
      remainingBudget: 0,
      requiresRSVP: false,
      status: "Active",
      attendance: [],
      attendees: [],
      volunteer: [],
      eventAttendanceQRCode: "",
      eventInvitationQRCode: "",
      eventQRCode: "",
      checkLists: this.eventRegisterForm.value.checkLists,
      isInternalEvent: true,
      expenses: expensesObj
    }

    const eventUpdateFormData: EventRequest = {
      eventId: this.id!,
      eventName: this.eventRegisterForm.value.eventName,
      eventDescription: this.eventRegisterForm.value.eventDescription,
      eventFromDate: this.eventRegisterForm.value.eventFromDate,
      eventToDate: this.eventRegisterForm.value.eventToDate,
      eventLocation: this.eventRegisterForm.value.eventLocation,
      organizer: {
        empid: "",
        name: this.eventRegisterForm.value.name,
        email: '',
      },
      department: this.eventRegisterForm.value.department.value,
      eventType: "Internal",
      budget: this.eventRegisterForm.value.budget,
      eventEndTime: "",
      eventStartTime: "",
      isInvitationRequired: false,
      isSnacks: this.eventRegisterForm.value.isSnacks.value,
      isVotable: this.eventRegisterForm.value.isVotable.value,
      maxAttendees: 100,
      needVolunteer: this.eventRegisterForm.value.needVolunteer.value,
      remainingBudget: this.pendingBudget,
      requiresRSVP: false,
      status: "Active",
      attendance: this.attandance,
      attendees: this.attendees,
      volunteer: this.volunteers,
      eventAttendanceQRCode: "",
      eventInvitationQRCode: "",
      eventQRCode: "",
      checkLists: this.eventRegisterForm.value.checkLists,
      isInternalEvent: true,
      expenses: expensesObj
    }
    console.log(this.id!);

    this.eventService.saveEvent(this.id == null ? eventFormData : eventUpdateFormData).subscribe({
      next: (response) => {
        console.log("Response", response);
        this.loading = false;
        if (!this.id) {
          this.resetForm();
          this.toastService.showSuccessToast("Event Created Successfully", "Event ID " + response.eventId);
        } else {
          this.toastService.showSuccessToast("Event Updated Successfully", "Event ID " + response.eventId);
        }

      },
      error: (error) => {
        console.log("Error", error);
        this.loading = false;
        this.toastService.showErrorToast("Error", "Event Registration Failed");
      }
    })



  }

  resetForm() {
    this.eventRegisterForm.reset();
    console.log('Form reset');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.eventRegisterForm.controls;
  }

  checkError = (controlName: string, errorName: string) => {
    return this.eventRegisterForm.controls[controlName].hasError(errorName) && this.eventRegisterForm.controls[controlName].dirty;
  }

  searchIEC() {
    this.isIECFound = true;
  }

  clear(table: Table) {
    table.clear();
  }

  @ViewChild('dt') dt: Table | undefined;

  applyFilterGlobal($event: any, stringVal: any) {
    console.log($event);
    console.log(stringVal);
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  onUploadPicture(event: UploadEvent) {
    for (let file of event.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Data = e.target.result;
        this.uploadedFiles.push(base64Data);
        console.log(this.uploadedFiles)
      };
      reader.readAsDataURL(file);

    }

    console.log("Base 64", this.uploadedFiles)



  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;

  }





}

