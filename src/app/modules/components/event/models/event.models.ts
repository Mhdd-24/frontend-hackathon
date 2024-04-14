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
