import { randomUUID } from "crypto";
import BaseInterface from "./base.interface";

export type BaseProps = {
    id?: string;
    active?: boolean;
    createAT?: Date;
    updateAT?: Date;
    deactivateAT?: Date;
}

export default class Base implements BaseInterface {

    private _id: string;
    private _active: boolean;
    private _createAT: Date;
    private _updateAT: Date;
    private _deactivateAT: Date;

    constructor(props: BaseProps) {
        this._id = props.id || randomUUID();
        this._active = props.active || true;
        this._createAT = props.createAT || new Date(); // need to validate
        this._updateAT = props.updateAT || new Date(); // need to validate
        this._deactivateAT = props.deactivateAT || new Date(); // need to validate
    }

    activate(date:Date){
        this._active = true;
        this._updateAT = date;
    }

    deactivate(date:Date){
        this._active = false;
        this._deactivateAT = date;
    }

    get id(): string {
        return this._id;
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
}