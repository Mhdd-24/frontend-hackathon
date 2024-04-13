
export interface TrainerDetailsProduct {
    id?: number;
    trainerId?: string;
    trainerName?: string;
    phoneNumber?: number;
    doj?: Date;
    gender?: string;
    inventoryStatus?: string;
    eid?: number;
    image?: string;
    quantity?: number;
}

export interface StudentDetailsProduct {
    id?: number;
    name?: string;
    studentID?: string;
    email?: string;
    number?: number;
    gender?: string;
    emId?: string;
    birthDate?: Date;
    joinDate?: Date;
    inventoryStatus?: String;
    image?: string;
    quantity?: number;
}

export interface EventDetailsProduct {
    id?: number;
    workshopName?: string;
    workshopCategory?: string;
    eventCategory?: string;
    studentEventRegister?: number;
    hallBookingID?: string;
    studentAmount?: number;
    image?: string;
    quantity?: number;
}