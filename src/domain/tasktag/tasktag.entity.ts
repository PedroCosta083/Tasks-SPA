import Base, { BaseProps } from "../generic/base.entity";
import { Tag } from "../tags/tags.entity";
import Task from "../task/task.entity";
import TaskTagInterface from "./tasktag.interface";

export type TaskTagProps = BaseProps & {
    taskId: Task;
    tagId: Tag[];
}

export default class TaskTag extends Base implements TaskTagInterface {
    private _taskId: Task;
    private _tagId: Tag[];

    constructor(props: TaskTagProps) {
        super(props)
        this._tagId = props.tagId,
        this._taskId = props.taskId
    }
    get taskId(): Task {
        return this._taskId
    }
    get tagId(): Tag[] {
       return this._tagId
    }
    
}
