export default interface TaskInterface {
    get tag(): string;
    get title(): string;
    get description(): string;
    get date(): Date;
    get duration(): string;
    validateTask(): string[];
}