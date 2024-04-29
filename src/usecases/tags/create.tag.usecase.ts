import { Tag, TagsProps } from "../../domain/tags/tags.entity";
import TagsRepositoryInterface from "../../domain/tags/tags.repository.Interface";


export default class CreateTagUseCase {
    constructor(private readonly tagsRepository: TagsRepositoryInterface) { }

    async execute(tagProps: TagsProps): Promise<void> {
        const errors: string[] = this.validateTagProps(tagProps);
        if (errors.length > 0) {
            throw (errors.join('\n'));
        }

        const existingTag = await this.tagsRepository.findByName(tagProps.name);

        if (existingTag !== null) {
            console.log("Tag Props", tagProps.name);
            console.log(existingTag);
            throw new Error('Tag with this name already exists');
        } else {
            const newTag = new Tag(tagProps);
            await this.tagsRepository.create(newTag);
            console.log('Tag created successfully');
        }
    }


    private validateTagProps(tagProps: TagsProps): string[] {
        const errors: string[] = [];
        return errors;
    }
}
