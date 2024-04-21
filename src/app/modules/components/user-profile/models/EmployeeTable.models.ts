export interface EmployeeTableDetails {
  empid: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  dob: string;
  doj: string;
  address: string;
  mobileno: string;
  userId: string;
  employeeExperience: {
    companyName: string;
    domain: string;
    yearsOfExp: number;
  }[];
  skillVsRating: {
    [skill: string]: number;
  }[];
}
