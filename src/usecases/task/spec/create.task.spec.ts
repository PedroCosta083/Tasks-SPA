import { Tag } from "../../../domain/tags/tags.entity";
import TaskRepository from "../../../repository/taskRepository/task.repository";
import CreateTaskUseCase from "../create.task.usecase";

describe('CreateTaskUseCase', () => {
    const repository = new TaskRepository();
    const now = new Date();
    now.setMinutes(now.getMinutes() + 2);
    beforeEach(async () => {
        await repository.deleteAll();
    });
    const useCase = new CreateTaskUseCase(repository);

    it('should create a new task', async () => {
        const taskProps = {
            id: "1",
            title: "Task 1",
            description: "Description new Task 1",
            dateTime: now,
            duration: 100,
            tags: []
        };
        await useCase.execute(taskProps);
        const createdTask = await repository.findById(taskProps.id);
        expect(createdTask).toBeDefined();
        expect(createdTask!.id).toBe(taskProps.id);
    });

    it('should create a new task with tag', async () => {
        const newTags = [new Tag({ name: "New Tag 1" }), new Tag({ name: "New Tag 2" })]
        const taskProps = {
            id: "1",
            title: "Task 1",
            description: "Description new Task 1",
            dateTime: now,
            duration: 100,
            tags: newTags
        };
        await useCase.execute(taskProps);
        const createdTask = await repository.findById(taskProps.id);
        expect(createdTask).toBeDefined();
        expect(createdTask!.id).toBe(taskProps.id);
        expect(createdTask!.tags.length).toBe(2);
    });

    it('should throw an error if title is invalid', async () => {
        const invalidTaskProps = {
            id: "1",
            title: "",
            description: "Description new Task 1",
            dateTime: now,
            duration: 100,
            tags: []
        };
        await expect(useCase.execute(invalidTaskProps)).rejects.toThrow("Title is required and must be a non-empty string.");
    });

    it('should throw an error if  duration is invalid', async () => {
        const invalidTaskProps = {
            id: "1",
            title: "Task 1",
            description: "Description new Task 1",
            dateTime: now,
            duration: -1,
            tags: []
        };
        await expect(useCase.execute(invalidTaskProps)).rejects.toThrow("Invalid duration.");
    });
    it('should throw an error if all properties are invalid', async () => {
        const invalidTaskProps = {
            title: "",
            description: "",
            dateTime: new Date('2003/04/12'),
            duration: -1,
        };
        await expect(useCase.execute(invalidTaskProps)).rejects.toThrow();
    });
});
