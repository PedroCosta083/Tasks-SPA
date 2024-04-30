import { Tag } from "../../domain/tags/tags.entity";
import Task from "../../domain/task/task.entity";
import TaskRepository from "../../repository/taskRepository/task.repository";

export default class UpdateTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }

    async execute(taskToUpdate: Task, newTags?: Tag[]): Promise<void> {
        if (!(taskToUpdate instanceof Task)) {
            throw new Error("Invalid taskToUpdate parameter.");
        }
        if (newTags && !Array.isArray(newTags)) {
            throw new Error("Invalid newTags parameter.");
        }

        try {
            const existingTask = await this.taskRepository.findById(taskToUpdate.id);
            if (!existingTask) {
                throw new Error("Task not found.");
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
            console.error("Error updating task:", error);
            throw error;
        }
    }
}
