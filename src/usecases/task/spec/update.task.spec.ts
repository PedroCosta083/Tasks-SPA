import UpdateTaskUseCase from "../update.task.usecase";
import Task from "../../../domain/task/task.entity";
import TagsRepository from "../../../repository/tagRepositoy/tags.repository";
import { Tag } from "../../../domain/tags/tags.entity";
import TaskRepository from "../../../repository/taskRepository/task.repository";

describe('UpdateTaskUseCase', () => {
    const repository = new TaskRepository();
    const repositoryTag = new TagsRepository();
    const now = new Date();
    now.setMinutes(now.getMinutes() + 2);
    beforeEach(async () => {
        await repository.deleteAll();
        await repositoryTag.deleteAll();
    });

    it('should update existing task properties', async () => {
        const useCase = new UpdateTaskUseCase(repository);

        const existingTaskTitle = 'Existing Task';
        const existingTaskDescription = 'Existing Task description';
        const existingTaskDateTime = now;
        const existingTaskDuration = 100;
        const existingTask = new Task({
            title: existingTaskTitle,
            description: existingTaskDescription,
            dateTime: existingTaskDateTime,
            duration: existingTaskDuration,
        });
        await repository.create(existingTask);

        const updatedTaskTitle = 'Updated Task Title';
        const updatedTaskDescription = 'Updated Task description';
        const updatedTaskDateTime = now;
        const updatedTaskDuration = existingTaskDuration + 50;
        const updatedTask = new Task({
            id: existingTask.id,
            title: updatedTaskTitle,
            description: updatedTaskDescription,
            dateTime: updatedTaskDateTime,
            duration: updatedTaskDuration,
        })
        await useCase.execute(updatedTask);

        const updatedTaskFound = await repository.findById(existingTask.id);
        expect(updatedTaskFound).toBeDefined();
        expect(updatedTaskFound!.title).toBe(updatedTaskTitle);
        expect(updatedTaskFound!.description).toBe(updatedTaskDescription);
        expect(updatedTaskFound!.dateTime).toEqual(updatedTaskDateTime);
        expect(updatedTaskFound!.duration).toBe(updatedTaskDuration);
    });

    it('should add tags to existing task', async () => {
        const useCase = new UpdateTaskUseCase(repository);

        const existingTaskTitle = 'Existing Task';
        const existingTask = new Task({
            title: existingTaskTitle,
            description: "Existing Task description",
            dateTime: now,
            duration: 100,
        });
        await repository.create(existingTask);

        const tag1 = new Tag({ name: 'Tag 1' });
        const tag2 = new Tag({ name: 'Tag 2' });
        await repositoryTag.create(tag1);
        await repositoryTag.create(tag2);

        await useCase.execute(existingTask, [tag1, tag2]);

        const updatedTask = await repository.findById(existingTask.id);
        expect(updatedTask).toBeDefined();
        expect(updatedTask!.tags).toContainEqual(tag1);
        expect(updatedTask!.tags).toContainEqual(tag2);
    });
});
