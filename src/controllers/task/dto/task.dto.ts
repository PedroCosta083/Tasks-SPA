import { Tag } from "src/domain/tags/tags.entity";

export type CreateTaskDTO = {
    title: string;
    description: string;
    dateTime: Date;
    duration: number;
    tags?: Tag[];
};

export type TaskInputDTO = {
    title?: string;
    description?: string;
    dateTime?: Date;
    duration?: number;
    tags?: Tag[];
}

export type UpdateTaskDTO = {
    active?: boolean;
    title?: string;
    description?: string;
    dateTime?: Date;
    duration?: number;
    tags?: Tag[];
};