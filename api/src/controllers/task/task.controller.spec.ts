import { TaskController } from './task.controller';
import CreateTaskUseCase from '../../usecases/task/create.task.usecase';
import DeleteTaskUseCase from '../../usecases/task/delete.task.usecase';
import { FindAllTaskUseCase } from '../../usecases/task/findAll.task.usecase';
import { FindTaskByIdUseCase } from '../../usecases/task/findByID.task.usecase';
import UpdateTaskUseCase from '../../usecases/task/update.task.usecase';
import FindAllTasksByTitleUseCase from '../../usecases/task/findByTitle.task.usecase';
import { FindTagByIdUseCase } from '../../usecases/tags/findById.tag.usecase';
import FindAllTasksByTagUseCase from '../../usecases/task/findAllByTag.task.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import Task from '../../domain/task/task.entity';
import { NotFoundException } from '@nestjs/common';
import { Tag } from '../../domain/tags/tags.entity';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';
import TaskRepository from '../../repository/taskRepository/task.repository';
import TagsRepository from '../../repository/tagRepositoy/tags.repository';

describe('TaskController', () => {
  let controller: TaskController;
  let createTaskUseCase: CreateTaskUseCase;
  let deleteTaskUseCase: DeleteTaskUseCase;
  let findAllTaskUseCase: FindAllTaskUseCase;
  let findTaskByIdUseCase: FindTaskByIdUseCase;
  let updateTaskUseCase: UpdateTaskUseCase;
  let findAllTasksByTitleUseCase: FindAllTasksByTitleUseCase;
  let findTagByIdUseCase: FindTagByIdUseCase;
  let findAllTasksByTagUseCase: FindAllTasksByTagUseCase;
  const now = new Date();
  now.setMinutes(now.getMinutes() + 2);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        CreateTaskUseCase,
        DeleteTaskUseCase,
        FindAllTaskUseCase,
        FindTaskByIdUseCase,
        UpdateTaskUseCase,
        FindAllTasksByTitleUseCase,
        FindTagByIdUseCase,
        FindAllTasksByTagUseCase,
        TaskRepository,
        TagsRepository,
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    createTaskUseCase = module.get<CreateTaskUseCase>(CreateTaskUseCase);
    deleteTaskUseCase = module.get<DeleteTaskUseCase>(DeleteTaskUseCase);
    findAllTaskUseCase = module.get<FindAllTaskUseCase>(FindAllTaskUseCase);
    findTaskByIdUseCase = module.get<FindTaskByIdUseCase>(FindTaskByIdUseCase);
    updateTaskUseCase = module.get<UpdateTaskUseCase>(UpdateTaskUseCase);
    findAllTasksByTitleUseCase = module.get<FindAllTasksByTitleUseCase>(
      FindAllTasksByTitleUseCase,
    );
    findTagByIdUseCase = module.get<FindTagByIdUseCase>(FindTagByIdUseCase);
    findAllTasksByTagUseCase = module.get<FindAllTasksByTagUseCase>(
      FindAllTasksByTagUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [
        new Task({
          id: '1',
          title: 'Task 1',
          description: 'Task 1 description',
          dateTime: now,
          duration: 10,
        }),
        new Task({
          id: '2',
          title: 'Task 2',
          description: 'Task 2 description',
          dateTime: now,
          duration: 10,
        }),
      ];
      jest.spyOn(findAllTaskUseCase, 'execute').mockResolvedValue(tasks);

      expect(await controller.findAll()).toBe(tasks);
    });

    it('should throw NotFoundException when no tasks are found', async () => {
      jest.spyOn(findAllTaskUseCase, 'execute').mockResolvedValue(null);

      await expect(controller.findAll()).rejects.toThrow(NotFoundException);
    });
  });

  describe('findById', () => {
    it('should return the task with the specified ID', async () => {
      const taskId = '1';
      const task = new Task({
        id: taskId,
        title: 'Task 1',
        description: 'Task 1 description',
        dateTime: now,
        duration: 10,
      });
      jest.spyOn(findTaskByIdUseCase, 'execute').mockResolvedValue(task);

      expect(await controller.findById(taskId)).toBe(task);
    });

    it('should throw NotFoundException when task is not found', async () => {
      const taskId = '1';
      jest.spyOn(findTaskByIdUseCase, 'execute').mockResolvedValue(null);

      await expect(controller.findById(taskId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByTitle', () => {
    it('should return an array of tasks with the specified title', async () => {
      const title = 'Task Title';
      const tasks = [
        new Task({
          id: '1',
          title: title,
          description: 'Task 1 description',
          dateTime: now,
          duration: 10,
        }),
        new Task({
          id: '2',
          title: title,
          description: 'Task 2 description',
          dateTime: now,
          duration: 10,
        }),
      ];
      jest
        .spyOn(findAllTasksByTitleUseCase, 'execute')
        .mockResolvedValue(tasks);

      expect(await controller.findByTitle(title)).toBe(tasks);
    });

    it('should throw NotFoundException when no tasks are found with the specified title', async () => {
      const title = 'Task Title';
      jest.spyOn(findAllTasksByTitleUseCase, 'execute').mockResolvedValue(null);

      await expect(controller.findByTitle(title)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findByTag', () => {
    it('should return an array of tasks with the specified tag', async () => {
      const tagId = '1';
      const tag = new Tag({ id: tagId, name: 'Tag 1' });
      const tasks = [
        new Task({
          id: '1',
          title: 'Task 1',
          description: 'Task 1 description',
          dateTime: now,
          duration: 10,
          tags: [tag],
        }),
        new Task({
          id: '2',
          title: 'Task 2',
          description: 'Task 2 description',
          dateTime: now,
          duration: 10,
          tags: [tag],
        }),
      ];

      jest.spyOn(findTagByIdUseCase, 'execute').mockResolvedValue(tag);
      jest.spyOn(findAllTasksByTagUseCase, 'execute').mockResolvedValue(tasks);

      expect(await controller.findByTag(tagId)).toBe(tasks);
    });

    it('should throw NotFoundException when tag is not found', async () => {
      const tagId = '1';
      jest.spyOn(findTagByIdUseCase, 'execute').mockResolvedValue(null);

      await expect(controller.findByTag(tagId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException when no tasks are found with the specified tag', async () => {
      const tagId = '1';
      const tag = new Tag({ id: tagId, name: 'Tag 1' });
      jest.spyOn(findTagByIdUseCase, 'execute').mockResolvedValue(tag);
      jest.spyOn(findAllTasksByTagUseCase, 'execute').mockResolvedValue([]);

      await expect(controller.findByTag(tagId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDTO = {
        title: 'New Task',
        description: 'Description of new task',
        dateTime: now,
        duration: 10,
      };

      jest.spyOn(createTaskUseCase, 'execute').mockResolvedValue(undefined);

      await expect(controller.create(createTaskDto)).resolves.not.toThrow();
    });
  });

  describe('update', () => {
    it('should update an existing task', async () => {
      const taskId = '1';
      const updateTaskDto: UpdateTaskDTO = {
        title: 'task to update',
        description: 'Description of updated task',
        dateTime: now,
        duration: 10,
      };
      const existingTask = new Task({
        id: taskId,
        title: 'New Task',
        description: 'Description of new task',
        dateTime: now,
        duration: 10,
      });

      jest
        .spyOn(findTaskByIdUseCase, 'execute')
        .mockResolvedValue(existingTask);
      jest.spyOn(updateTaskUseCase, 'execute').mockResolvedValue(undefined);

      await expect(
        controller.update(taskId, updateTaskDto),
      ).resolves.not.toThrow();
    });

    it('should throw NotFoundException if task does not exist', async () => {
      const taskId = '42143431';
      const updateTaskDto: UpdateTaskDTO = {
        title: 'task to update',
        description: 'Description of updated task',
        dateTime: now,
        duration: 10,
      };
      jest
        .spyOn(findTaskByIdUseCase, 'execute')
        .mockRejectedValue(new Error('Task not found'));
      await expect(controller.update(taskId, updateTaskDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete an existing task', async () => {
      const taskId = '1';

      jest.spyOn(deleteTaskUseCase, 'execute').mockResolvedValue(undefined);

      await expect(controller.delete(taskId)).resolves.not.toThrow();
    });

    it('should throw NotFoundException if task does not exist', async () => {
      const taskId = '1';

      jest
        .spyOn(deleteTaskUseCase, 'execute')
        .mockRejectedValue(new Error('Task not found'));

      await expect(controller.delete(taskId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
