import Task from "../../domain/task/task.entity";
import TaskRepository from "../../repository/taskRepository/task.repository";

export default class FindTaskByTitleUseCase {
    constructor(private taskRepository: TaskRepository) { }

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
