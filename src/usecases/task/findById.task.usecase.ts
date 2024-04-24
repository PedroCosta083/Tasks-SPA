import Task from "../../domain/task/task.entity";
import TaskRepositoryInterface from "../../domain/task/task.repository.interface";

export default class FindTaskByIdUseCase {
    constructor(private taskRepository: TaskRepositoryInterface) { }

    async execute(taskId: string): Promise<Task | null | string[]> {
        try {
            const task = await this.taskRepository.findByID(taskId);
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
