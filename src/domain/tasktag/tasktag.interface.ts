import { Tag } from "../tags/tags.entity";
import Task from "../task/task.entity";

export default interface TaskTagInterface {
    get taskId(): Task;
    get tagId(): Tag[];
}