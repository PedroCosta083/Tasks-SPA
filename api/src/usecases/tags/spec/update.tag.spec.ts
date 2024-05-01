import { Tag } from "../../../domain/tags/tags.entity";
import Task from "../../../domain/task/task.entity";
import TagsRepository from "../../../repository/tagRepositoy/tags.repository";
import UpdateTagUseCase from "../update.tag.usecase";

describe('UpdateTagUseCase', () => {
    const repository = new TagsRepository();

    beforeEach(async () => {
        await repository.deleteAll();
    });

    it('should update tag without task', async () => {
        const useCase = new UpdateTagUseCase(repository);
        const existingTagName = 'Existing Tag';
        const existingTag = new Tag({ name: existingTagName });
        console.log("Existing Tag id: ", existingTag.id)
        await repository.create(existingTag);

        await useCase.execute((new Tag({
            id: existingTag.id,
            name: "Updated Tag Name",
            active: true,
            createdAt: existingTag.createdAt,
            updatedAt: new Date(),
            deactivatedAt: existingTag.deactivatedAt
        })));

        const updatedTag = await repository.findTagById(existingTag.id);
        expect(updatedTag).toBeDefined();
        expect(updatedTag!.id).toBe(existingTag.id);
        expect(updatedTag!.name).toBe("Updated Tag Name");
    });

    it('should update tag with new task', async () => {
        const useCase = new UpdateTagUseCase(repository);

        const existingTagName = 'Existing Tag';
        const updatedTagName = 'Updated Tag Name';
        const newTaskTitle = 'New Task';
        const existingTag = new Tag({ name: existingTagName });
        await repository.create(existingTag);
        const now = new Date();
        now.setMinutes(now.getMinutes() + 2);
        const newTask = new Task({
            title: newTaskTitle,
            description: "New Task description",
            dateTime: now,
            duration: 100,
        });
        await useCase.execute((new Tag({
            id: existingTag.id,
            name: updatedTagName,
            active: true,
            createdAt: existingTag.createdAt,
            updatedAt: new Date(),
            deactivatedAt: existingTag.deactivatedAt
        })), newTask);

        const updatedTag = await repository.findTagById(existingTag.id);
        expect(updatedTag).toBeDefined();
        expect(updatedTag!.id).toBe(existingTag.id);
        expect(updatedTag!.name).toBe(updatedTagName);
        expect(updatedTag!.task.length).toBe(1);
        expect(updatedTag!.task[0].title).toBe(newTaskTitle);
    });
});
