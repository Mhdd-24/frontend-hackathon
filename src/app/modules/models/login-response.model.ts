// ---------------------------------------
// Email: quickapp@ebenmonney.com
// Templates: www.ebenmonney.com/templates
// (c) 2023 www.ebenmonney.com/mit-license
// ---------------------------------------

import { PermissionValues } from './permission.model';


export interface LoginResponse {
  id_token: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}


export interface IdToken {
  iat: number;
  exp: number;
  iss: string;
  aud: string | string[];
  sub: string;
  role: string | string[];
  permission: PermissionValues | PermissionValues[];
  name: string;
  email: string;
  phone_number: string;
  fullname: string;
  jobtitle: string;
  configuration: string;
}

export interface Employee {
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
  skillVsRating: { [key: string]: number };
}

interface EmployeeExperience {
  companyName: string;
  domain: string;
  yearsOExp: number;
}
export interface SaveEmployeeResponse {
  message: string;
  status: string;
  employee: EmployeeData;
}

interface EmployeeData {
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
}
