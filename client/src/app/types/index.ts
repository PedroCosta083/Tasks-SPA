// types/index.ts
export interface Tags {
    _id: string;
    _name: string;
    _tasks?: Task[]
}
export interface Task {
    _id: string;
    _title: string;
    _description: string;
    _dateTime: Date;
    _duration: number;
    _active: boolean;
    _tags?: Tags[]
}

export interface TaskCreateProps {
    id: string;
    title: string;
    description: string;
    dateTime: Date;
    duration: number;
    active?: boolean;
    tags?: Tags[]
}

export interface TaskUpdateProps {
    _id: string;
    _title?: string;
    _description?: string;
    _dateTime?: Date;
    _duration?: number;
    _active?: boolean;
    _tags?: Tags[]
} 
