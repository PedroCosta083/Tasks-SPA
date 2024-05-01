import { Injectable } from "@nestjs/common";
import Task, { TaskProps } from "../../domain/task/task.entity";
import TaskRepository from "../../repository/taskRepository/task.repository";

@Injectable()
export default class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(taskData: TaskProps): Promise<void> {
        const task = new Task(taskData);
        console.log('task', task)
        try {
            console.log('passou')
            return await this.taskRepository.create(task);
        } catch (error) {
            throw (error);
        }
    }
}
