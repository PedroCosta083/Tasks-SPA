import { randomUUID } from "crypto";
import BaseInterface from "./base.interface";

export type BaseProps = {
    id?: string;
    title?: string;
    description?: string;
    active?: boolean;
    createAT?: Date;
    updateAT?: Date;
    deactivateAT?: Date;
}

export default class Base implements BaseInterface {

    private _id: string;
    private _title: string;
    private _description: string;
    private _active: boolean;
    private _createAT: Date;
    private _updateAT: Date;
    private _deactivateAT: Date;

    constructor(props: BaseProps) {
        this._id = props.id || randomUUID();
        this._active = props.active || true;
        this._title = props.title || "";
        this._description = props.description || "";
        this._active = props.active || true;
        this._createAT = props.createAT || new Date(); // need to validate
        this._updateAT = props.updateAT || new Date(); // need to validate
        this._deactivateAT = props.deactivateAT || new Date(); // need to validate
    }


    activate(date: Date) {
        this._active = true;
        this._updateAT = date;
    }

    deactivate(date: Date) {
        this._active = false;
        this._deactivateAT = date;
    }

    get id(): string {
        return this._id;
    }
    get title(): string {
        return this._title;
    }
    get decription(): string {
        return this.decription;
    }
    get active(): boolean {
        return this._active;
    }
    get createAT(): Date {
        return this._createAT;
    }
    get updateAT(): Date {
        return this._updateAT;
    }
    get deactivateAT(): Date {
        return this._deactivateAT;
    }
    validate(): string[] {
        const errors: string[] = [];

        const currentDate = new Date();

        if (!(this._createAT instanceof Date) || isNaN(this._createAT.getTime())) {
            errors.push('Invalid createAT date');
        }
        if (!(this._updateAT instanceof Date) || isNaN(this._updateAT.getTime())) {
            errors.push('Invalid updateAT date');
        }
        if (!(this._deactivateAT instanceof Date) || isNaN(this._deactivateAT.getTime())) {
            errors.push('Invalid deactivateAT date');
        }
        if (this._createAT > currentDate || this._updateAT > currentDate || this._deactivateAT > currentDate) {
            errors.push('Dates cannot be in the future');
        }
        return errors;
    }
}