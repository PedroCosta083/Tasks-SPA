import { Tag } from "../../../domain/tags/tags.entity";
import Task from "../../../domain/task/task.entity";
import TaskRepository from "../../../repository/taskRepository/task.repository";
import FindAllTasksByTagUseCase from "../findAllByTag.task.usecase";


describe('FindTaskByTagUseCase', () => {
    const repository = new TaskRepository();
    const now = new Date();
    now.setMinutes(now.getMinutes() + 2);
    beforeEach(async () => {
        await repository.deleteAll();
    });

    it('should find task by Tag', async () => {
        const tag = new Tag({ name: "Test Tag" })
        await repository.create(new Task({
            id: "1",
            title: "Test Task 1",
            description: "Test Task 1",
            dateTime: now,
            duration: 10,
            tags: [tag]
        }));
        await repository.create(new Task({
            id: "2",
            title: "Test Task 2",
            description: "Test Task 2",
            dateTime: now,
            duration: 10,
            tags: [tag]
        }));
        await repository.create(new Task({
            id: "3",
            title: "Test Task 3",
            description: "Test Task 3",
            dateTime: now,
            duration: 10,
            tags: [tag]
        }));
        const useCase = new FindAllTasksByTagUseCase(repository);
        const result = await useCase.execute(tag);
        expect(result).toBeDefined();
        expect(result!.length).toBe(3);
        expect(result!.every(task => task.tags.some(t => t.name === tag.name))).toBeTruthy();
    });

    it('should return null if task is not found', async () => {
        const nonExistentTag = new Tag({ name: "nonExistent" });
        const useCase = new FindAllTasksByTagUseCase(repository);
        const result = await useCase.execute(nonExistentTag);
        expect(result).toBeNull();
    });
});
