import { Appointment } from './appoiment';
import { Review } from './review';
export interface Client { 
    email: string;
    id: string;
    last_name: string;
    name: string;
    phone_number: string;
    photo_url: string;
    roles: string[];
    reviews: Review[];
    appointments: Appointment[];
}