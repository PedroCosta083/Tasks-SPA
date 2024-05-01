import Task from "../../../domain/task/task.entity";
import TaskRepository from "../../../repository/taskRepository/task.repository";
import { FindAllTaskUseCase } from "../findAll.task.usecase";

describe('FindAllTaskUseCase', () => {
    const repository = new TaskRepository();
    const now = new Date();
    now.setMinutes(now.getMinutes() + 2);
    beforeEach(async () => {
        await repository.deleteAll();
    });

    it('should find all tasks', async () => {
        await repository.create(new Task({
            title: "Task 1",
            description: "Task 1",
            dateTime: now,
            duration: 10,
        }));
        await repository.create(new Task({
            title: "Task 2",
            description: "Task 2",
            dateTime: now,
            duration: 10,
        }));
        await repository.create(new Task({
            title: "Task 3",
            description: "Task 3",
            dateTime: now,
            duration: 10,
        }));

        const useCase = new FindAllTaskUseCase(repository);

        const result = await useCase.execute();

        expect(result).toHaveLength(3);
        expect(result![0].title).toBe('Task 1');
        expect(result![1].title).toBe('Task 2');
        expect(result![2].title).toBe('Task 3');
    });

    it('should return null if no task are found', async () => {
        const useCase = new FindAllTaskUseCase(repository);

        const result = await useCase.execute();

        expect(result).toBeNull();
    });
});
