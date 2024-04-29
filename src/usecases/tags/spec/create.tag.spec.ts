import { Tag } from "../../../domain/tags/tags.entity";
import TagsRepository from "../../../repository/tags.repository";
import CreateTagUseCase from "../create.tag.usecase";


describe('CreateTagUseCase', () => {
    const repository = new TagsRepository();

    beforeEach(async () => {
        await repository.deleteAll();
    });

    it('should create a new tag', async () => {
        const useCase = new CreateTagUseCase(repository);
        const tagProps = { name: 'Test Tag' };
        await useCase.execute(tagProps);
        const createdTag = await repository.findByName(tagProps.name);
        expect(createdTag).toBeDefined();
        expect(createdTag!.name).toBe(tagProps.name);
    });

    it('should throw an error if tag properties are invalid', async () => {
        const useCase = new CreateTagUseCase(repository);
        const invalidTagProps = { name: '' };
        await expect(useCase.execute(invalidTagProps)).rejects.toThrow("Name is required and must be a non-empty string.");
    });

    it('should throw an error if tag with the same name already exists', async () => {
        const useCase = new CreateTagUseCase(repository);
        const existingTagName = 'Existing Tag';
        await repository.create(new Tag({ name: existingTagName }));
        await expect(useCase.execute({ name: existingTagName })).rejects.toThrow("Tag with this name already exists");
    });
});
