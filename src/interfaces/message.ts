import { Client } from "./Client";
import { Professional } from "./professional";

export interface Message {
    chatroom_id: string;
    message: string;
    client: Client;
    Professional: Professional;
}
