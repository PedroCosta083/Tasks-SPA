import { Tag } from "../../domain/tags/tags.entity";
import TagsRepositoryInterface from "../../domain/tags/tags.repository.Interface";


export default class FindTagByNameUseCase {
    constructor(private readonly tagsRepository: TagsRepositoryInterface) { }

    async execute(name: string): Promise<Tag | null> {
        try {
            const tag = await this.tagsRepository.findByName(name);
            return tag;
        } catch (error) {
            console.log("Unable to find tag by name")
            return null
        }


    }
}
