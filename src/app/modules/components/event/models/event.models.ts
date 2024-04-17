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

export interface Expenses {
    [key: string]: number;
}

export interface EventRequest {
    eventName: string;
    eventDescription: string;
    eventFromDate: string;
    eventToDate: string;
    eventStartTime: string;
    eventEndTime: string;
    eventLocation: string;
    status: string;
    organizer: EmpDto;
    department: string;
    eventType: string;
    maxAttendees: number;
    requiresRSVP: boolean;
    isInternalEvent: boolean;
    isInvitationRequired: boolean;
    isVotable: boolean;
    isSnacks: boolean;
    needVolunteer: boolean;
    attendees: AttendeesDto[]; // who is attending and not attending
    attendance: AttendeesDto[]; // once event complete the survey will be added here
    volunteer: AttendeesDto[]; // volunteer
    eventInvitationQRCode: string;
    eventQRCode: string;
    eventAttendanceQRCode: string;
    budget: number;
    remainingBudget: number;
    expenses: Expenses[];
    checkLists: CheckList[];

}

interface CheckList {
    isCompleted: boolean;
    checklistDescription: string;
}

export interface AttendeesDto {
    employee: EmpDto;
    status: string;
    category: string; // can be invitation or feedback
    type: string; // can be event with feedback, event without feedback
    feedback: string;
    isAttending: boolean;
    isPresent: boolean;
    rating: string;
}

export interface EmpDto {
    empid: string;
    name: string;
    email: string;
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
    organizer: Organizer;
    department: string;
    eventType: string;
    maxAttendees: number;
    requiresRSVP: boolean;
    needVolunteer: boolean;
    attendees: AttendeesDto[];
    attendance: AttendeesDto[];
    volunteer: AttendeesDto[];
    eventInvitationQRCode: string;
    eventQRCode: string;
    eventAttendanceQRCode: string;
    budget: number;
    remainingBudget: number;
    expenses: Expenses;
    checkLists: CheckList[];
    invitationRequired: boolean;
    internalEvent: boolean;
    snacks: boolean;
    votable: boolean;
}

export interface EventUpdateBody {
    eventId: string;
    employeeMail: string;
    category: string;
    type: string;
    feedback: string;
    isAttending: boolean;
    isPresent: boolean;
    rating: string;
}

