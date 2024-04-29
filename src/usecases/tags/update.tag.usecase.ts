import { Tag } from "../../domain/tags/tags.entity";
import TagsRepositoryInterface from "../../domain/tags/tags.repository.Interface";
import Task from "../../domain/task/task.entity";


export default class UpdateTagUseCase {
    constructor(private readonly tagsRepository: TagsRepositoryInterface) { }

    async execute(tagToUpdate: Tag, newTask?: Task): Promise<void> {
        console.log("tag To Update: ", tagToUpdate)
        const existingTag = await this.tagsRepository.findById(tagToUpdate.id);
        console.log("Existing tag: ", tagToUpdate)
        if (!existingTag) {
            throw ("Tag not found.");
        }
        const newTag = new Tag({
            id: existingTag.id,
            name: tagToUpdate.name,
            active: tagToUpdate.active,
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
