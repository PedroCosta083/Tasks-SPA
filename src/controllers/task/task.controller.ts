import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { FindAllTaskUseCase } from '../../usecases/task/findAll.task.usecase';
import { FindTaskByIdUseCase } from '../../usecases/task/findByID.task.usecase';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';
import CreateTaskUseCase from '../../usecases/task/create.task.usecase';
import DeleteTaskUseCase from '../../usecases/task/delete.task.usecase';
import UpdateTaskUseCase from '../../usecases/task/update.task.usecase';
import Task from '../../domain/task/task.entity';

@Controller('tasks')
export class TaskController {
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase,
        private readonly findAllTaskUseCase: FindAllTaskUseCase,
        private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase,
    ) { }

    @Get()
    async findAll(): Promise<Task[] | null> {
        const tasks = await this.findAllTaskUseCase.execute();
        if (!tasks) {
            throw new NotFoundException('No tasks found.');
        }
        return tasks;
    }


    @Get(':id')
    async findById((@Param('id'))) : string) {
    const task = await this.findTaskByIdUseCase.execute(id);
    if (!task) {
        throw new NotFoundException('Task not found.');
    }
    return task;
}

@Post()
async create(@Body() createTaskDto: CreateTaskDTO) {
    try {
        await this.createTaskUseCase.execute(createTaskDto);
    } catch (error) {
        throw new InternalServerErrorException('Error creating task.');
    }
}

@Put(':id')
async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDTO) {
    try {
        await this.updateTaskUseCase.execute(id, updateTaskDto);
    } catch (error) {
        throw new InternalServerErrorException('Error updating task.');
    }
}

@Delete(':id')
async delete (@Param('id') id: string) {
    try {
        await this.deleteTaskUseCase.execute(id);
    } catch (error) {
        throw new InternalServerErrorException('Error deleting task.');
    }
}
}
