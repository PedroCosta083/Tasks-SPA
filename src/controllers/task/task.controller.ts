import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, InternalServerErrorException, Query } from '@nestjs/common';
import { FindAllTaskUseCase } from '../../usecases/task/findAll.task.usecase';
import { FindTaskByIdUseCase } from '../../usecases/task/findByID.task.usecase';
import { CreateTaskDTO, UpdateTaskDTO } from './dto/task.dto';
import CreateTaskUseCase from '../../usecases/task/create.task.usecase';
import DeleteTaskUseCase from '../../usecases/task/delete.task.usecase';
import UpdateTaskUseCase from '../../usecases/task/update.task.usecase';
import Task from '../../domain/task/task.entity';
import FindAllTasksByTitleUseCase from '../../usecases/task/findByTitle.task.usecase';
import { FindTagByIdUseCase } from '../../usecases/tags/findById.tag.usecase';
import FindAllTasksByTagUseCase from '../../usecases/task/findAllByTag.task.usecase';

@Controller('task')
export class TaskController {
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase,
        private readonly findAllTaskUseCase: FindAllTaskUseCase,
        private readonly findAllTaskByTitleUseCase: FindAllTasksByTitleUseCase,
        private readonly findTaskByIdUseCase: FindTaskByIdUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase,
        private readonly findTagByIdUseCase: FindTagByIdUseCase,
        private readonly findAllTasksByTagUseCase: FindAllTasksByTagUseCase,
    ) { }

    @Get('tasks')
    async findAll(): Promise<Task[] | null> {
        const tasks = await this.findAllTaskUseCase.execute();
        if (!tasks) {
            throw new NotFoundException('No tasks found.');
        }
        return tasks;
    }


    @Get(':id')
    async findById(@Param('id') id: string) {
        const task = await this.findTaskByIdUseCase.execute(id);
        if (!task) {
            throw new NotFoundException('Task not found.');
        }
        return task;
    }

    @Get('/title/search')
    async findByTitle(@Query('title') title: string): Promise<Task[]> {
        const tasks = await this.findAllTaskByTitleUseCase.execute(title);
        if (!tasks) {
            throw new NotFoundException('No tasks found with the specified title');
        }
        return tasks;
    }
    @Get('tag/:tagId')
    async findByTag(@Param('tagId') tagId: string): Promise<Task[]> {
        const tag = await this.findTagByIdUseCase.execute(tagId);
        if (!tag) {
            throw new NotFoundException('Tag not found');
        }
        const tasks = await this.findAllTasksByTagUseCase.execute(tag);
        if (!tasks || tasks.length === 0) {
            throw new NotFoundException('No tasks found with the specified tag');
        }
        return tasks;
    }
    @Post('create')
    async create(@Body() createTaskDto: CreateTaskDTO) {
        try {
            const dateTime = new Date(createTaskDto.dateTime);
            const taskData = { ...createTaskDto, dateTime };
            if (taskData.dateTime < new Date()) {
                throw ('Date in the past.')
            }
            await this.createTaskUseCase.execute(taskData);
        } catch (error) {
            throw new InternalServerErrorException('Error creating task : ' + error);
        }
    }

    @Put('update/:id')
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDTO) {
        try {
            if (updateTaskDto.dateTime) {
                const dateTime = new Date(updateTaskDto.dateTime);
                const taskData = { ...updateTaskDto, dateTime };
                await this.updateTaskUseCase.execute(id, taskData, updateTaskDto?.tags);
            } else {
                await this.updateTaskUseCase.execute(id, updateTaskDto, updateTaskDto?.tags);
            }


        } catch (error) {
            throw new InternalServerErrorException('Error updating task : ' + error);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            await this.deleteTaskUseCase.execute(id);
        } catch (error) {
            throw new InternalServerErrorException('Error deleting task.');
        }
    }
}
