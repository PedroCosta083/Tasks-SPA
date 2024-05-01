import Task from "../../../domain/task/task.entity";
import TaskRepository from "../../../repository/taskRepository/task.repository";
import DeleteTaskUseCase from "../delete.task.usecase";

describe('DeleteTaskUseCase', () => {
    const repository = new TaskRepository();

    beforeEach(async () => {
        await repository.deleteAll();
    });

    it('should delete a task', async () => {
        const taskId = 'someId';
        await repository.create(new Task({
            id: "someId",
            active: true,
            title: "Task 1",
            description: "Description 1",
            dateTime: new Date(),
            duration: 10,
        }));
        const useCase = new DeleteTaskUseCase(repository);
        await useCase.execute(taskId);
        const deletedTag = await repository.findById(taskId);
        expect(deletedTag).toBeNull();
    });
});
