export interface EmployeeResponse {
  id: string;
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
  employeeExperience: EmployeeExperience[];
  skillVsRating: SkillVsRating;
}

export interface EmployeeExperience {
  companyName: string;
  domain: string;
  yearsOfExp: number;
}

export interface SkillVsRating {
  [skill: string]: number;
}

