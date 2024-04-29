import { Tag } from "../../../domain/tags/tags.entity";
import TagsRepository from "../../../repository/tags.repository";
import FindTagByNameUseCase from "../findByName.tag.usecase";


describe('FindTagByNameUseCase', () => {
    const repository = new TagsRepository();

    beforeEach(async () => {
        await repository.deleteAll();
    });

    it('should find tag by name', async () => {
        const useCase = new FindTagByNameUseCase(repository);
        const tagName = 'Test Tag';
        await repository.create(new Tag({ name: tagName }));
        const result = await useCase.execute(tagName);
        expect(result).toBeDefined();
        expect(result!.name).toBe(tagName);
    });

    it('should return null if tag not found', async () => {
        const useCase = new FindTagByNameUseCase(repository);
        const tagName = 'Nonexistent Tag';
        const result = await useCase.execute(tagName);
        expect(result).toBeNull();
    });
});
