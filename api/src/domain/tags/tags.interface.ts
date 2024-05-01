
import Task from "../task/task.entity";

export interface TagsInterface {
    get name(): string;
    get task(): Task[];
    validateTag():void;
}