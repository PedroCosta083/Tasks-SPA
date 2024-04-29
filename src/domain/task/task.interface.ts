//import Holiday from "../holiday/holiday.entity";
import { Tag } from "../tags/tags.entity";

export default interface TaskInterface {
    get title(): string
    get description(): string
    get dateTime(): Date;
    get duration(): number;
    get tags(): Tag[];
    // get holidays(): Holiday[];
    validateTask(): void;
}