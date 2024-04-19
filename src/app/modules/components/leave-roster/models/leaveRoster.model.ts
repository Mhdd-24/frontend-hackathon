export interface Employee {
    empid: string | null;
    name: string;
    email: string | null;
    department: string | null;
}

export interface LeaveResponse {
    message: string;
    status: string;
    data: {
        leaveEmployees: Employee[];
        onSiteEmployees: Employee[];
        wfhEmployees: Employee[];
    } | null;
}