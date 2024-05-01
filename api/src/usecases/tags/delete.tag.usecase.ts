
import { Injectable } from "@nestjs/common";
import TagsRepository from "../../repository/tagRepositoy/tags.repository";
@Injectable()
export default class DeleteTagUseCase {
    constructor(private readonly tagsRepository: TagsRepository) { }

    async execute(tagId: string): Promise<void> {
        await this.tagsRepository.delete(tagId);
    }
}
