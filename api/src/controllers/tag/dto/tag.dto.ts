
import Task from "src/domain/task/task.entity";

export type CreateTagDTO = {
    name: string;
    tasks?: Task[];
};

export type TagInputDTO = {
    name: string;
    tasks?: Task[];
}

export type UpdateTagDTO = {
    name: string;
    active?:boolean;
    tasks?: Task;
};