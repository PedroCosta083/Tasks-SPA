import { Tag } from "../../../domain/tags/tags.entity";
import TagsRepository from "../../../repository/tags.repository";
import { FindAllTagsUseCase } from "../findAll.tag.usecase";

describe('FindAllTagsUseCase', () => {
    const repository = new TagsRepository();

    beforeEach(async () => {
        await repository.deleteAll();
    });

    it('should find all tags', async () => {
        await repository.create(new Tag({ name: 'Tag 1' }));
        await repository.create(new Tag({ name: 'Tag 2' }));
        await repository.create(new Tag({ name: 'Tag 3' }));

        const useCase = new FindAllTagsUseCase(repository);

        const result = await useCase.execute();

        expect(result).toHaveLength(3);
        expect(result![0].name).toBe('Tag 1');
        expect(result![1].name).toBe('Tag 2');
        expect(result![2].name).toBe('Tag 3');
    });

    it('should return null if no tags are found', async () => {
        const useCase = new FindAllTagsUseCase(repository);

        const result = await useCase.execute();

        expect(result).toBeNull();
    });
});
