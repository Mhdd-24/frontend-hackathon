export interface DashboardResponse {
    message: string;
    status: string;
    data: DashboardData;
}

export interface DashboardData {
    empCount: number;
    eventCount: number;
    employeesDob: EmployeeData[];
    departmentLeaveDtosList: DepartmentLeaveDto[];
    totalLeaveCount: number;
    totalWfhCount: number;
    totalOnSiteCount: number;
}

export interface EmployeeData {
    id?: string;
    empid?: string;
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

export interface EmployeeExperience {
    companyName: string;
    domain: string;
    yearsOfExp: number;
}

export interface DepartmentLeaveDto {
    department: string;
    leaveCount: number;
    wfhCount: number;
    onSiteCount: number;
}
