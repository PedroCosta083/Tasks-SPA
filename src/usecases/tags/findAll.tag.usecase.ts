import { Tag } from "../../domain/tags/tags.entity";
import TagsRepository from "../../repository/tagRepositoy/tags.repository";


export class FindAllTagsUseCase {
    constructor(private tagsRepository: TagsRepository) { }

    async execute(): Promise<Tag[] | null> {
        try {
            const tags = await this.tagsRepository.findAll();
            return tags;
        } catch (error) {
            console.error("Error when searching all tags:", error);
            return null;
        }
    }
}
