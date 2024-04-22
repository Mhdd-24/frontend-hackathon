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

export interface Product {
  id?: string;
  complaintId?: string;
  userId?: string;
  userEmail?: string;
  complaintTitle?: string;
  complaintDescription?: string;
  category?: string;
  status?: string;
}

