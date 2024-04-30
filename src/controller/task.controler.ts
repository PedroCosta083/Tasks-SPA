import { Request, Response } from 'express';
import { FindAllTaskUseCase } from '../usecases/task/findAll.task.usecase';
import { FindTaskByIdUseCase } from '../usecases/task/findByID.task.usecase';
import { Tag } from '../domain/tags/tags.entity';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';
import FindAllTasksByTagUseCase from '../usecases/task/findAllByTag.task.usecase';
import FindAllTasksByTitleUseCase from '../usecases/task/findByTitle.task.usecase';
import CreateTaskUseCase from '../usecases/task/create.task.usecase';
import UpdateTaskUseCase from '../usecases/task/update.task.usecase';
import DeleteTaskUseCase from '../usecases/task/delete.task.usecase';

class TaskController {
    constructor(
        private findAllUseCase: FindAllTaskUseCase,
        private findAllByTagUseCase: FindAllTasksByTagUseCase,
        private findAllByTitleUseCase: FindAllTasksByTitleUseCase,
        private findByIdUseCase: FindTaskByIdUseCase,
        private createUseCase: CreateTaskUseCase,
        private updateUseCase: UpdateTaskUseCase,
        private deleteUseCase: DeleteTaskUseCase
    ) { }

    async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await this.findAllUseCase.execute();
            res.status(200).json(tasks);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    async getTaskById(req: Request, res: Response): Promise<void> {
        const taskId = req.params.id;

        try {
            const task = await this.findByIdUseCase.execute(taskId);
            res.status(200).json(task);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    async createTask(req: Request, res: Response): Promise<void> {
        const taskData: CreateTaskDTO = req.body;

        try {
            const createdTask = await this.createUseCase.execute(taskData);
            res.status(201).json(createdTask);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    async updateTask(req: Request, res: Response): Promise<void> {
        const taskData: UpdateTaskDTO = req.body;
        const tags: Tag[] | undefined = req.body.tags;

        try {
            const updatedTask = await this.updateUseCase.execute(taskData, tags);
            res.status(200).json(updatedTask);
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }

    async deleteTask(req: Request, res: Response): Promise<void> {
        const taskId = req.params.id;

        try {
            await this.deleteUseCase.execute(taskId);
            res.status(204).send();
        } catch (error) {
            const errorMessage = (error as Error).message;
            res.status(500).json({ message: errorMessage });
        }
    }
}

export default TaskController;
