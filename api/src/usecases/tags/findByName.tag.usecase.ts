import { Injectable } from "@nestjs/common";
import { Tag } from "../../domain/tags/tags.entity";
import TagsRepository from "../../repository/tagRepositoy/tags.repository";

@Injectable()
export default class FindTagByNameUseCase {
    constructor(private readonly tagsRepository: TagsRepository) { }

    async execute(name: string): Promise<Tag[] | null> {
        try {
            const tag = await this.tagsRepository.findByName(name);
            return tag;
        } catch (error) {
            console.log("Unable to find tag by name")
            return null
        }


    }
}
