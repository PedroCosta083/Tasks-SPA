import { Injectable } from "@nestjs/common";
import { Tag } from "../../domain/tags/tags.entity";
import Task from "../../domain/task/task.entity";
import TagsRepository from "../../repository/tagRepositoy/tags.repository";
import { UpdateTagDTO } from "src/controllers/tag/dto/tag.dto";

@Injectable()
export default class UpdateTagUseCase {
    constructor(private readonly tagsRepository: TagsRepository) { }

    async execute(tagToUpdateId: string, tagToUpdate: UpdateTagDTO, newTask?: Task): Promise<void> {
        const existingTag = await this.tagsRepository.findTagById(tagToUpdateId);
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
