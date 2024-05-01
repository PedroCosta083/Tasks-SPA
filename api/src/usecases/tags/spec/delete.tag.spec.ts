import { Tag } from "../../../domain/tags/tags.entity";
import TagsRepository from "../../../repository/tagRepositoy/tags.repository";
import DeleteTagUseCase from "../delete.tag.usecase";

describe('DeleteTagUseCase', () => {
    const repository = new TagsRepository();

    beforeEach(async () => {
        await repository.deleteAll();
    });

    it('should delete a tag', async () => {
        const tagId = 'someId';
        await repository.create(new Tag({ id: "someId", name: "Tag" }));
        const useCase = new DeleteTagUseCase(repository);
        await useCase.execute(tagId);
        const deletedTag = await repository.findById(tagId);
        expect(deletedTag).toBeNull();
    });
});
