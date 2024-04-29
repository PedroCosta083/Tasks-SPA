import TagsRepositoryInterface from "../../domain/tags/tags.repository.Interface";

export default class DeleteTagUseCase {
    constructor(private readonly tagsRepository: TagsRepositoryInterface) { }

    async execute(tagId: string): Promise<void> {
        await this.tagsRepository.delete(tagId);
    }
}
