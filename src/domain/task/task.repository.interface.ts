import Task from "./task.entity";

export default interface TaskRepositoryInterface{
    add(task : Task) : Promise<void>;
    update(task : Task) : Promise<Task>
    activate(taskID : string, activate: boolean) : Promise<void>
    findByTitle(taskTitle : string) : Promise<Task>;
    findAll():Promise<Task[]>;
    findByID(taskID: string): Promise<Task>;
    findAllByTag(tag:string):Promise<Task[]>;
}