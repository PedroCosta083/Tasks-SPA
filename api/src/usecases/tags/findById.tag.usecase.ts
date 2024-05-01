
import { Injectable } from "@nestjs/common";
import { Tag } from "../../domain/tags/tags.entity";
import TagsRepository from "../../repository/tagRepositoy/tags.repository";

@Injectable()
export class FindTagByIdUseCase {
    constructor(private tagsRepository: TagsRepository) { }

    async execute(tagId: string): Promise<Tag | null> {
        console.log("Usecase", tagId)
        try {
            console.log('pasosu')
            return await this.tagsRepository.findTagById(tagId);

        } catch (error) {
            throw ("Error when searching for tag by ID" + error);
        }
    }
}
