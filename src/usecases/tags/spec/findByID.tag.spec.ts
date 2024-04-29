import { Tag } from "../../../domain/tags/tags.entity";
import TagsRepository from "../../../repository/tags.repository";
import { FindTagByIdUseCase } from "../findById.tag.usecase";

describe('FindTagByIdUseCase', () => {
    const repository = new TagsRepository();

    beforeEach(async () => {
        await repository.deleteAll();
    });

    it('should find tag by ID', async () => {
        await repository.create(new Tag({ id: '1', name: 'Test Tag' }));
        const useCase = new FindTagByIdUseCase(repository);
        const result = await useCase.execute("1");
        expect(result).toBeDefined();
        expect(result!.id).toBe("1");
        expect(result!.name).toBe('Test Tag');
    });

    it('should return null if tag is not found', async () => {
        const useCase = new FindTagByIdUseCase(repository);
        const result = await useCase.execute('nonExistentId');
        expect(result).toBeNull();
    });
});
