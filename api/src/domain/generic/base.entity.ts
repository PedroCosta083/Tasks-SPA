import { randomUUID } from 'crypto';
import BaseInterface from './base.interface';

export type BaseProps = {
  id?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deactivatedAt?: Date;
};


export default class Base implements BaseInterface {
  private _id: string;
  private _active: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deactivatedAt: Date;

  constructor(props: BaseProps) {
    this._id = props.id || randomUUID();
    this._active = props.active || true;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
    this._deactivatedAt = props.deactivatedAt || new Date();

    this.validate();
  }

  activate(date: Date) {
    this._active = true;
    this._updatedAt = date;
  }

  deactivate(date: Date) {
    this._active = false;
    this._deactivatedAt = date;
  }

  get id(): string {
    return this._id;
  }

  get active(): boolean {
    return this._active;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get deactivatedAt(): Date {
    return this._deactivatedAt;
  }

  validate(): void {
    if (!this.id || typeof this.id !== 'string' || this.id.trim() === '') {
      throw 'ID is required and must be a non-empty string.';
    }
    if (typeof this.active !== 'boolean') {
      throw 'Active must be a boolean value.';
    }

    const currentDate = new Date();
    if (!(this.createdAt instanceof Date) || isNaN(this.createdAt.getTime())) {
      throw 'Invalid createdAt date.';
    } else if (this.createdAt > currentDate) {
      throw 'createdAt date cannot be in the future.';
    }
    if (!(this.updatedAt instanceof Date) || isNaN(this.updatedAt.getTime())) {
      throw 'Invalid updatedAt date.';
    } else if (this.updatedAt > currentDate) {
      throw 'updatedAt date cannot be in the future.';
    }
    if (
      !(this.deactivatedAt instanceof Date) ||
      isNaN(this.deactivatedAt.getTime())
    ) {
      throw 'Invalid deactivatedAt date.';
    } else if (this.deactivatedAt > currentDate) {
      throw 'deactivatedAt date cannot be in the future.';
    }
  }
}
