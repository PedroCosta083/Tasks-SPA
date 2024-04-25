import Task from "./task.entity";
import BaseRepositoryInterface from "../generic/base.reposository.interface";
import { Tags } from "../tags/tags.entity";

export default interface TaskRepositoryInterface extends BaseRepositoryInterface<Task> {
    findByTitle(taskTitle: string): Promise<Task>;
    findAllByTag(tag: Tags[]): Promise<Task[]>;
}
