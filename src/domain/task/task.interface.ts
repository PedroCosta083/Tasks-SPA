import { Tags } from "../tags/tags.entity";

export default interface TaskInterface {
    get tag(): Tags[];
    get date(): Date;
    get duration(): number;
    validate(): string[];
}