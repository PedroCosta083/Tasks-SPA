import Base, { BaseProps } from "../generic/base.entity";
import { Tags } from "../tags/tags.entity";
import TaskInterface from "./task.interface";

export type TaksProps = BaseProps & {
    tag: Tags[];
    date: Date;
    duration: number;
}

export default class Task extends Base implements TaskInterface {
    private _tag: Tags[];
    private _date: Date;
    private _duration: number;

    constructor(props: TaksProps) {
        super(props);
        this._tag = props.tag;
        this._date = props.date;
        this._duration = props.duration;
        this.validate();
    }
    
    get tag(): Tags[] {
       return this._tag
    } 
    get date(): Date {
        return this._date
    }
    get duration(): number {
        return this._duration
    }
    validate(): string[] {
        const errors = super.validate();
        if (!this._tag || this._tag.length === 0) {
            errors.push("Tag is required.");
        }
        if (!this._date || isNaN(this._date.getTime())) {
            errors.push("Invalid date.");
        }
        if (!this._duration || isNaN(this._duration) || this._duration <= 0) {
            errors.push("Invalid duration.");
        }
        return errors;
    }
}