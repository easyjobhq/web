import { City } from "./city";
import { Service } from "./service";
import { Speciality } from "./speciality";

export interface Professional {
    id: string;    
    name: string;
    last_name: string;
    email: string;
    phone_number: string;
    photo_url: string;
    roles: string[];
    cities: City[];
    score: number;
    description: string;
    specialities: Speciality[];
    services: Service[];
};
