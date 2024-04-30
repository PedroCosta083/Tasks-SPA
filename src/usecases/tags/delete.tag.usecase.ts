
import TagsRepository from "../../repository/tagRepositoy/tags.repository";

export default class DeleteTagUseCase {
    constructor(private readonly tagsRepository: TagsRepository) { }

    async execute(tagId: string): Promise<void> {
        await this.tagsRepository.delete(tagId);
    }
}
