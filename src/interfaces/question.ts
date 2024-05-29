import { Client } from "./Client";

export interface Question {
    id: string;
    question_description: string;
    title: string;
    client: Client;
}