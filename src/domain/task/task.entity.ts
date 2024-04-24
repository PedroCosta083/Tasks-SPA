import Base, { BaseProps } from "../generic/base.entity";
import TaskInterface from "./task.interface";

export type TaksProps = BaseProps & {
    tag: string;
    title: string;
    description: string;
    date: Date;
    duration: string;
}

export default class Task extends Base implements TaskInterface {
    private _tag: string;
    private _title: string;
    private _description: string;
    private _date: Date;
    private _duration: string;

    constructor(props: TaksProps) {
        super(props);
        this._tag = props.tag;
        this._title = props.title;
        this._description = props.description;
        this._date = props.date;
        this._duration = props.duration;
        this.validateTask();
    }
    get tag(): string {
        throw new Error("Method not implemented.");
    }
    get title(): string {
        throw new Error("Method not implemented.");
    }
    get description(): string {
        throw new Error("Method not implemented.");
    }
    get date(): Date {
        throw new Error("Method not implemented.");
    }
    get duration(): string {
        throw new Error("Method not implemented.");
    }
    validateTask(): string[] {
        const errors: string[] = [];

        if (!this._tag) {
            errors.push("Tag is required.");
        }

        if (!this._title) {
            errors.push("Title is required.");
        }

        if (!this._description) {
            errors.push("Description is required.");
        }

        if (!this._date || isNaN(this._date.getTime())) {
            errors.push("Invalid date.");
        }

        return errors;
    }
}