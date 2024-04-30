import { Tag } from "../../domain/tags/tags.entity";
import Task from "../../domain/task/task.entity";
import TagsRepository from "../../repository/tagRepositoy/tags.repository";


export default class UpdateTagUseCase {
    constructor(private readonly tagsRepository: TagsRepository) { }

    async execute(tagToUpdate: Tag, newTask?: Task): Promise<void> {
        const existingTag = await this.tagsRepository.findById(tagToUpdate.id);
        if (!existingTag) {
            throw ("Tag not found.");
        }
        const newTag = new Tag({
            id: existingTag.id,
            name: tagToUpdate.name ?? existingTag.name,
            active: tagToUpdate.active ?? existingTag.active,
            createdAt: existingTag.createdAt,
            updatedAt: new Date(),
            deactivatedAt: existingTag.deactivatedAt
        })
        if (newTask) {
            newTag.addTask(newTask);
        }
        await this.tagsRepository.update(newTag);
    }
}
