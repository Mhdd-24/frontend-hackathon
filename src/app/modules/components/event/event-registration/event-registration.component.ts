import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, FormArray } from '@angular/forms';
import { EventRequest } from '../models/event.models';
import { EventService } from '../services/event.service';
import { ToastService } from '../../../services/toast.service';


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
  minDate: Date = new Date();
  loading: boolean = false;
  eventRegisterForm !: FormGroup;
  isIECFound: boolean = false;

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
      eventName: new FormControl<string | null>("Gurukal", [Validators.required]),
      budget: new FormControl<number | null>(1000, [Validators.required]),
      eventDescription: new FormControl<string | null>("Knowledge Session", [Validators.required]),
      eventFromDate: new FormControl<Date | null>(new Date(), [Validators.required]),
      eventToDate: new FormControl<Date | null>(new Date(), [Validators.required]),
      eventLocation: new FormControl<string | null>("1st Floor", [Validators.required]),
      name: new FormControl<string | null>("Jaeson Karter", [Validators.required]),
      department: new FormControl<Department | null>({ value: 'Web Portals', viewValue: 'Web Portals' }, [Validators.required]),
      isVotable: new FormControl<BooleanOption | null>({ value: true, viewValue: 'Yes' }, [Validators.required]),
      isSnacks: new FormControl<BooleanOption | null>({ value: true, viewValue: 'Yes' }, [Validators.required]),
      needVolunteer: new FormControl<BooleanOption | null>({ value: true, viewValue: 'Yes' }, [Validators.required]),
      checkLists: this.formBuilder.array([
        this.formBuilder.group({
          checklistDescription: new FormControl<string | null>("Arrange Chairs"),
          isCompleted: new FormControl<boolean | null>(false)
        },
        )
      ])
    })
  }

  get checkLists(): FormArray {
    return this.eventRegisterForm.get("checkLists") as FormArray
  }

  newBranch() {
    this.checkLists.push(
      this.formBuilder.group({
        checklistDescription: new FormControl<string | null>(null),
        isCompleted: new FormControl<boolean | null>(null)
      })
    )
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
        department: this.eventRegisterForm.value.department.value
      },
      department: this.eventRegisterForm.value.department.value,
      eventType: "Internal",
      budget: this.eventRegisterForm.value.budget,
      eventEndTime: "",
      eventStartTime: "",
      expenses: {
        expense1: 0,
        expense2: 0
      },
      isInternalEvent: true,
      isInvitationRequired: false,
      isSnacks: this.eventRegisterForm.value.isSnacks.value,
      isVotable: this.eventRegisterForm.value.isVotable.value,
      maxAttendees: 100,
      needVolunteer: this.eventRegisterForm.value.needVolunteer.value,
      remainingBudget: 0,
      requiresRSVP: false,
      status: "Active"
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

}

