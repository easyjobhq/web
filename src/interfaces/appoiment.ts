import { Client } from "./Client";
import { PaymentMethod } from "./payment_method";
import { Professional } from "./professional";


export interface Appointment {
    id:string,
    date:Date,
    location:string,
    hour:string,
    service:string,
    client: Client,
    professional: Professional,
    paymentMethod:PaymentMethod

}