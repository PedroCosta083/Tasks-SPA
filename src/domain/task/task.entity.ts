import Base, { BaseProps } from "../generic/base.entity";
import { Tag } from "../tags/tags.entity";
import TaskInterface from "./task.interface";

export type TaskProps = BaseProps & {
    title: string;
    description: string;
    dateTime: Date;
    duration: number;
    tags?: Tag[];
};

export default class Task extends Base implements TaskInterface {

    private _title: string;
    private _description: string;
    private _dateTime: Date;
    private _duration: number;
    private _tags: Tag[];

    constructor(props: TaskProps) {
        super(props);
        this._title = props.title.trim();
        this._description = props.description.trim();
        this._dateTime = props.dateTime;
        this._tags = props.tags ? this.validateTags(props.tags) : [];
        this._duration = props.duration;
        this.validateTask();
    }

    get title(): string {
        return this._title;
    }

    get description(): string {
        return this._description;
    }

    get tags(): Tag[] {
        return this._tags;
    }

    get dateTime(): Date {
        return this._dateTime;
    }

    get duration(): number {
        return this._duration;
    }

    addTag(tag: Tag): void {
        if (!this.tags.find(existingTag => existingTag.id === tag.id)) {
            this._tags.push(tag);
        }
    }

    removeTag(tagId: string): void {
        this._tags = this._tags.filter(existingTag => existingTag.id !== tagId);
    }

    validateTask(): void {
        if (typeof this._title !== 'string' || this._title.trim() === '') {
            throw ("Title cannot be empty.");
        }
        if (typeof this._description !== 'string' || this._description.trim() === '') {
            throw ("Description cannot be empty.");
        }
        if (!(this._dateTime instanceof Date) || isNaN(this._dateTime.getTime()) || this._dateTime < new Date()) {
            throw ("Invalid date or date in the past.");
        }
        if (!this.isValidDuration(this._duration)) {
            throw ("Invalid duration.");
        }
    }


    private isValidDuration(duration: number): boolean {
        return Number.isInteger(duration) && duration > 0;
    }

    private validateTags(tags: Tag[]): Tag[] {
        const uniqueTags: Tag[] = [];
        const tagIds: Set<string> = new Set();

        for (const tag of tags) {
            if (tag && tag.id && !tagIds.has(tag.id)) {
                uniqueTags.push(tag);
                tagIds.add(tag.id);
            }
        }

        return uniqueTags;
    }
}
