import { Evento } from "../evento/evento";

export class APIresponse {
    count!: number;
    next!: string | null;
    previous!: string | null;
    results!: Evento[]; 
}
