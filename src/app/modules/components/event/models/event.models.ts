export interface eventSaveResponse {
    eventId: string;
    status: string;
    messege: string;
}

interface Organizer {
    empid: string;
    name: string;
    email: string;
    department: string;
}

interface Expenses {
    expense1: number;
    expense2: number;
}

export interface EventRequest {
    eventName: string;
    eventDescription: string;
    eventFromDate: string;
    eventToDate: string;
    eventStartTime: string;
    eventEndTime: string;
    eventLocation: string;
    organizer: Organizer;
    department: string;
    eventType: string;
    maxAttendees: number;
    requiresRSVP: boolean;
    isInternalEvent: boolean;
    status: string;
    isInvitationRequired: boolean;
    isVotable: boolean;
    isSnacks: boolean;
    needVolunteer: boolean;
    budget: number;
    remainingBudget: number;
    expenses: Expenses;
}

interface Employee {
    empid: string;
    name: string;
    email: string;
}

interface Attendee {
    employee: Employee;
    status: null | string;
    category: string;
    type: string;
    feedback: string;
    isAttending: boolean;
    isPresent: boolean;
    rating: string;
}

export interface AllEventsResponse {
    id: string;
    eventId: string;
    eventName: string;
    eventDescription: string;
    eventFromDate: string;
    eventToDate: string;
    eventStartTime: string;
    eventEndTime: string;
    eventLocation: string;
    status: string;
    organizer: Employee;
    department: string;
    eventType: string;
    maxAttendees: number;
    requiresRSVP: boolean;
    attendees: Attendee[];
    attendance: Attendee[];
    eventInvitationQRCode: string;
    eventQRCode: string;
    eventAttendanceQRCode: string;
    checkList: any[];
    invitationRequired: boolean;
    internalEvent: boolean;
}

