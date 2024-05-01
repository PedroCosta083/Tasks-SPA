import { Injectable, NotFoundException } from "@nestjs/common";
import { Tag } from "../../domain/tags/tags.entity";
import Task from "../../domain/task/task.entity";
import TaskRepository from "../../repository/taskRepository/task.repository";
import { UpdateTaskDTO } from "src/controllers/task/dto/task.dto";
@Injectable()
export default class UpdateTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }

    async execute(taskToUpdateID: string, taskToUpdate: UpdateTaskDTO, newTags?: Tag[]): Promise<void> {
        if (newTags && !Array.isArray(newTags)) {
            throw new Error("Invalid newTags parameter.");
        }
        try {
            const existingTask = await this.taskRepository.findById(taskToUpdateID);
            if (!existingTask) {
                throw ("Task not found");
            }
            if (taskToUpdate.dateTime) {
                const dateTime = new Date(taskToUpdate.dateTime);
                if (isNaN(dateTime.getTime())) {
                    throw new Error('Invalid date.');
                }
                if (dateTime < new Date()) {
                    throw new Error('Date in the past.');
                }
            }
            const updatedTask = new Task({
                id: existingTask.id,
                title: taskToUpdate.title ?? existingTask.title,
                description: taskToUpdate.description ?? existingTask.description,
                dateTime: taskToUpdate.dateTime ?? existingTask.dateTime,
                duration: taskToUpdate.duration ?? existingTask.duration,
                active: taskToUpdate.active ?? existingTask.active,
                createdAt: existingTask.createdAt,
                updatedAt: new Date(),
                deactivatedAt: existingTask.deactivatedAt
            });

            if (newTags) {
                updatedTask.addTag(newTags);
            }
            await this.taskRepository.update(updatedTask);
        } catch (error) {
            console.error("Error updating task usecase :", error);
            throw error;
        }
    }
}
