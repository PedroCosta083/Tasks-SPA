export type CreateTaskDTO = {
    title: string;
    description: string;
    dateTime: Date;
    duration: number;
};

export type UpdateTaskDTO = {
    title?: string;
    description?: string;
    dateTime?: Date;
    duration?: number;
};
