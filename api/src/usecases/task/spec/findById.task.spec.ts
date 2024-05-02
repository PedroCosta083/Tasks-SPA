import Task from '../../../domain/task/task.entity';
import TaskRepository from '../../../repository/taskRepository/task.repository';
import { FindTaskByIdUseCase } from '../findByID.task.usecase';


describe('FindTaskByIdUseCase', () => {
  const repository = new TaskRepository();
  const now = new Date();
  now.setMinutes(now.getMinutes() + 2);
  beforeEach(async () => {
    await repository.deleteAll();
  });

  it('should find task by ID', async () => {
    await repository.create(
      new Task({
        id: '1',
        title: 'Test Task',
        description: 'Test Task',
        dateTime: now,
        duration: 10,
      }),
    );
    const useCase = new FindTaskByIdUseCase(repository);
    const result = await useCase.execute('1');
    expect(result).toBeDefined();
    expect(result!.id).toBe('1');
    expect(result!.title).toBe('Test Task');
  });

  it('should return null if task is not found', async () => {
    const useCase = new FindTaskByIdUseCase(repository);
    const result = await useCase.execute('nonExistentId');
    expect(result).toBeNull();
  });
});
