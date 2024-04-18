import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { AttendeesDto, EventRequest, Expenses } from '../models/event.models';
import { EventService } from '../services/event.service';
import { ToastService } from '../../../services/toast.service';
import { Table } from 'primeng/table';


interface Department {
  value: string;
  viewValue: string;
}

interface BooleanOption {
  value: boolean;
  viewValue: string;
}


@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrl: './event-registration.component.scss'
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
    private toastService: ToastService
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

    console.log(this.eventRegisterForm.value, eventFormData);

    this.eventService.saveEvent(eventFormData).subscribe({
      next: (response) => {
        console.log("Response", response);
        this.loading = false;
        this.resetForm();
        this.toastService.showSuccessToast("Event Registered Successfully", "Event ID " + response.eventId);
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

}

