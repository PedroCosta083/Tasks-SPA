
export interface CreateTaskDTO {
    title: string;
    description: string;
    dateTime: Date;
    duration: number;
}

export interface UpdateTaskDTO {
    title?: string;
    description?: string;
    dateTime?: Date;
    duration?: number;
}
