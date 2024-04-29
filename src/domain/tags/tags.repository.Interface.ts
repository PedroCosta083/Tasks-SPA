import Task from "../task/task.entity";
import { Tag } from "./tags.entity";

export default interface TagsRepositoryInterface {
    findById(tagId: string): Promise<Tag | null>;
    findByName(name: string): Promise<Tag | null>;
    findAll(): Promise<Tag[] | null>;
    create(tag: Tag): Promise<void>;
    update(tag: Tag, task?: Task): Promise<void>;
    delete(tagId: string): Promise<void>;
}
