import { Component, OnInit } from '@angular/core';

import { ToastService } from '../../../services/toast.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LeaveService } from '../services/leave.service';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { Employee } from '../models/leaveRoster.model';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-leave-roster',
  templateUrl: './leave-roster.component.html',
  styleUrl: './leave-roster.component.scss'
})
export class LeaveRosterComponent implements OnInit {
  todatDate = new Date();
  date: Date | undefined;
  leaveForm !: FormGroup;
  excelSheet !: File;
  formData = new FormData();
  file !: any;
  leaveData : string[]= []
  showTable: boolean = false;
  todaysLeaveData: string[] = [];
  leaveEmployees : Employee[] = [];
  onSiteEmployees : Employee[] = [];
  wfhEmployees : Employee[] = [];
  constructor(private leaveRosterService: LeaveService, private toasterService: ToastService, private fromBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.leaveForm = this.fromBuilder.group({
      file: new FormControl<File | null>(null),
      month: new FormControl<string>(''),
      year: new FormControl<string>(''),
    });

    const year = this.todatDate?.getFullYear();
    const month = this.todatDate?.toLocaleString('default', { month: 'long' });
    const day = this.todatDate?.getDate();

    const formData = new FormData();
    formData.append('month', month!.toString()!.toLowerCase());
    formData.append('year', year!.toString());
    formData.append('day', day!.toString());

    this.leaveRosterService.getLeaveData(formData).subscribe({
      next: (response) => {
        console.log("Response", response);
        this.leaveEmployees = response?.data!.leaveEmployees as Employee[];
        this.onSiteEmployees = response?.data!.onSiteEmployees as Employee[];
        this.wfhEmployees = response?.data!.wfhEmployees as Employee[];
      },
      error: (error) => {
        console.log("Error", error);
      }
    });
  }

  onUpload(event: UploadEvent) {
    console.log("Event", event.files[0]);
    this.file = event.files[0];
  }

  onShowLeaveData = () => {
    const year = this.date?.getFullYear();
    const month = this.date?.toLocaleString('default', { month: 'long' });
    const day = this.date?.getDate();

    console.log("Year", year, "Month", month, "Day", day);

    const formData = new FormData();
    formData.append('month', month!.toString()!.toLowerCase());
    formData.append('year', year!.toString());
    formData.append('day', day!.toString());

    this.leaveRosterService.getLeaveData(formData).subscribe({
      next: (response) => {
        console.log("Response", response);
        this.leaveEmployees = response?.data!.leaveEmployees as Employee[];
        this.onSiteEmployees = response?.data!.onSiteEmployees as Employee[];
        this.wfhEmployees = response?.data!.wfhEmployees as Employee[];
        this.showTable = true;
      },
      error: (error) => {
        console.log("Error", error);
      }
    });
  }


  onSubmit = () => {
    const formData: FormData = new FormData();
    const year = new Date(this.leaveForm.get('month')?.value).getUTCFullYear();
    const month = new Date(this.leaveForm.get('month')?.value).toLocaleString('default', { month: 'long' });
    console.log("Year", year);
    console.log("Month", month);
    formData.append('file', this.file, this.file.name);
    formData.append('month', month.toString());
    formData.append('year', year.toString());

    console.log("FormData", formData);


    this.leaveRosterService.uploadFile(formData).subscribe({
      next: (response) => {
        this.toasterService.showSuccessToast('File uploaded successfully', 'Success');
      },
      error: (error) => {
        this.toasterService.showErrorToast('Error while uploading file', 'Error');
      }
    });
  }

}
