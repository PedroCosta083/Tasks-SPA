import Task from '../../../domain/task/task.entity';
import TaskRepository from '../../../repository/taskRepository/task.repository';
import FindAllTasksByTitleUseCase from '../findByTitle.task.usecase';


describe('FindTaskByTagUseCase', () => {
  const repository = new TaskRepository();
  const now = new Date();
  now.setMinutes(now.getMinutes() + 2);
  beforeEach(async () => {
    await repository.deleteAll();
  });

  it('should find task by Tag', async () => {
    await repository.create(
      new Task({
        id: '1',
        title: 'Test Task',
        description: 'Test Task 1',
        dateTime: now,
        duration: 10,
      }),
    );
    await repository.create(
      new Task({
        id: '2',
        title: 'Test Task',
        description: 'Test Task 2',
        dateTime: now,
        duration: 10,
      }),
    );
    await repository.create(
      new Task({
        id: '3',
        title: 'Test Task',
        description: 'Test Task 3',
        dateTime: now,
        duration: 10,
      }),
    );
    const useCase = new FindAllTasksByTitleUseCase(repository);
    const result = await useCase.execute('Test Task');
    expect(result).toBeDefined();
    expect(result!.length).toBe(3);
    expect(result!.every((task) => task.title === 'Test Task')).toBeTruthy();
  });

  it('should return null if task is not found', async () => {
    const existentTag = new Task({
      id: '1',
      title: 'Test Task 1',
      description: 'Test Task 1',
      dateTime: now,
      duration: 10,
    });
    const existentTag2 = new Task({
      id: '2',
      title: 'Test Task 2',
      description: 'Test Task 2',
      dateTime: now,
      duration: 10,
    });
    await repository.create(existentTag);
    await repository.create(existentTag2);
    const useCase = new FindAllTasksByTitleUseCase(repository);
    const result = await useCase.execute('NonExistent Task');
    expect(result).toBeNull();
  });
});
