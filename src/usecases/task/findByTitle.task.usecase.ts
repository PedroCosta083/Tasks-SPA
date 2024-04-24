import Task from "../../domain/task/task.entity";
import TaskRepositoryInterface from "../../domain/task/task.repository.interface";

export default class FindTaskByTitleUseCase {
    constructor(private taskRepository: TaskRepositoryInterface) {}

    async execute(taskTitle: string): Promise<Task | null | string[]> {
        try {
            const task = await this.taskRepository.findByTitle(taskTitle);
            if (!task) {
                return ["Task not Found"]; 
            }
            return task;
        } catch (error) {
            console.error("Error getting task:", error);
            return ["Error getting task. Please try again later."];
        }
    }
}
