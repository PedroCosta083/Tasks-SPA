import { Tag } from "../../domain/tags/tags.entity";
import Task from "../../domain/task/task.entity";
import TagsRepository from "../../repository/tagRepositoy/tags.repository";

type TagsProps = {
    name: string;
    task?: Task[];
}
export default class CreateTagUseCase {
    constructor(private readonly tagsRepository: TagsRepository) { }

    async execute(tagProps: TagsProps): Promise<void> {
        const existingTag = await this.tagsRepository.findByName(tagProps.name);

        if (existingTag !== null) {
            throw new Error('Tag with this name already exists');
        } else {
            const newTag = new Tag(tagProps);
            await this.tagsRepository.create(newTag);
        }
    }
}
