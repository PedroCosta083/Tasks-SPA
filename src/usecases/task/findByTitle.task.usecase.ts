import Task from "../../domain/task/task.entity";
import TaskRepositoryInterface from "../../domain/task/task.repository.interface";

export default class FindTaskByTitleUseCase {
    constructor(private taskRepository: TaskRepositoryInterface) { }

    async execute(taskTitle: string): Promise<Task[] | null> {
        try {
            if (!taskTitle) {
                throw new Error("Task title is required");
            }
            const tasks = await this.taskRepository.findByTitle(taskTitle);
            if (!tasks) {
                return [];
            }
            return tasks;
        } catch (error) {
            console.error("Error getting tasks:", error);
            throw error;
        }
    }
}
