import { Client } from "./Client";
import { Professional } from "./professional";

export interface Review { 
    
    id: string;
    score: number;
    comment: string;
    client: Client;
    professional: Professional;
}