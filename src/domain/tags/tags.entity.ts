import Base, { BaseProps } from "../generic/base.entity";
import { TagsInterface } from "./tags.interface";
import Task from "../task/task.entity";

export type TagsProps = BaseProps & {
    name: string;
    task?: Task[];
}

export class Tag extends Base implements TagsInterface {
    private _name: string;
    private _task: Task[];

    constructor(props: TagsProps) {
        super(props);
        this._name = props.name;
        this._task = props.task ?? [];
        this.validateTag();
    }

    get name(): string {
        return this._name;
    }

    get task(): Task[] {
        return this._task;
    }

    addTask(task: Task): void {
        if (!this.task.find(existingTask => existingTask.id === task.id)) {
            this._task.push(task);
        }
    }

    removeTask(taskId: string): void {
        this._task = this._task.filter(task => task.id !== taskId);
    }

    validateTag(): void {
        if (!this._name || typeof this._name !== 'string' || this._name.trim() === '') {
            throw new Error('Name is required and must be a non-empty string.');
        }
        if (this._name.length > 50) {
            throw new Error('Name must be less than 50 characters.');
        }
        if (this._task.some(task => !(task instanceof Task))) {
            throw new Error('All tasks must be instances of Task.');
        }
    }


}


