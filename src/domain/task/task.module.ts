import { Module } from '@nestjs/common';
import { TaskController } from 'src/controllers/task/task.controller';
import TagsRepository from 'src/repository/tagRepositoy/tags.repository';
import TaskRepository from 'src/repository/taskRepository/task.repository';
import { FindTagByIdUseCase } from 'src/usecases/tags/findById.tag.usecase';
import CreateTaskUseCase from 'src/usecases/task/create.task.usecase';
import DeleteTaskUseCase from 'src/usecases/task/delete.task.usecase';
import { FindAllTaskUseCase } from 'src/usecases/task/findAll.task.usecase';
import FindAllTasksByTagUseCase from 'src/usecases/task/findAllByTag.task.usecase';
import { FindTaskByIdUseCase } from 'src/usecases/task/findByID.task.usecase';
import FindAllTasksByTitleUseCase from 'src/usecases/task/findByTitle.task.usecase';
import UpdateTaskUseCase from 'src/usecases/task/update.task.usecase';

@Module({
    imports: [],
    controllers: [TaskController],
    providers: [FindTagByIdUseCase, CreateTaskUseCase, UpdateTaskUseCase, DeleteTaskUseCase, FindAllTaskUseCase, FindTaskByIdUseCase, FindAllTasksByTagUseCase, FindAllTasksByTitleUseCase, TaskRepository,TagsRepository]
})
export class TaskModule { }
