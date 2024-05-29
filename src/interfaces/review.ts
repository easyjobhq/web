import { Client } from "./Client";

export interface Review { 
    
    id: string;
    score: number;
    comment: string;
    client: Client;
}