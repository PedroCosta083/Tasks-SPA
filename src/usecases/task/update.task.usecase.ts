import { Tag } from "../../domain/tags/tags.entity";
import Task from "../../domain/task/task.entity";
import TaskRepositoryInterface from "../../domain/task/task.repository.interface";
import TaskRepository from "../../repository/taskRepository/task.repository";


export default class UpdateTagUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }

    async execute(taskToUpdate: Task, newTags?: Tag[]): Promise<void> {
        const existingTask = await this.taskRepository.findById(taskToUpdate.id);
        if (!existingTask) {
            throw ("Task not found.");
        }
        const newTask = new Task({
            id: existingTask.id,
            title: taskToUpdate.title ?? existingTask.title,
            description: taskToUpdate.description ?? existingTask.description,
            dateTime: taskToUpdate.dateTime ?? existingTask.dateTime,
            duration: taskToUpdate.duration ?? existingTask.duration,
            active: taskToUpdate.active ?? existingTask.active,
            createdAt: existingTask.createdAt,
            updatedAt: new Date(),
            deactivatedAt: existingTask.deactivatedAt
        })
        if (newTags) {
            newTask.addTag(newTags);
        }
        await this.taskRepository.update(newTask);
    }
}
