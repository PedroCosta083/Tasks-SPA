import { Tag } from "@prisma/client";
import TagsRepository from "../../repository/tags.repository";


export class FindTagByIdUseCase {
    constructor(private tagsRepository: TagsRepository) { }

    async execute(tagId: string): Promise<Tag | null> {
        try {
            const tag = await this.tagsRepository.findById(tagId);
            return tag;
        } catch (error) {
            throw ("Error when searching for tag by ID");
        }
    }
}
