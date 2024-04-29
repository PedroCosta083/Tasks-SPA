import Task from "./task.entity";

export default interface TaskRepositoryInterface {
    findById(id: string): Promise<Task | null>;
    findByTitle(title: string): Promise<Task[] | null>;
    findAllByTag(tagId: string): Promise<Task[] | null>
    findAll(): Promise<Task[] | null>;
    create(task: Task): Promise<void>;
    update(task: Task): Promise<Task>;
    delete(id: string): Promise<void>;
}
