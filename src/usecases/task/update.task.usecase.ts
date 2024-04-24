import Task from "../../domain/task/task.entity";
import TaskRepositoryInterface from "../../domain/task/task.repository.interface";

export default class UpdateTaskUseCase {
    constructor(private taskRepository: TaskRepositoryInterface) { }

    async execute(taskId: string, updatedTaskData: Task): Promise<Task | string[]> {
        const existingTask = await this.taskRepository.findByID(taskId);
        if (!existingTask) {
            return ["Task not Found"];
        }

        // Update existing task data with new data
        Object.assign(existingTask, updatedTaskData);

        // Validate the updated task
        const errors = existingTask.validateTask();
        if (errors.length > 0) {
            return errors;
        }

        try {
            const updatedTask = await this.taskRepository.update(existingTask);
            return updatedTask;
        } catch (error) {
            console.error("Error updating task:", error);
            return ["Error updating task. Please try again later."];
        }
    }
}
