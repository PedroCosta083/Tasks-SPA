
import Task from "../../domain/task/task.entity";
import TaskRepository from "../../repository/taskRepository/task.repository";

export class FindTaskByIdUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(taskId: string): Promise<Task | null> {
        try {
            const task = await this.taskRepository.findById(taskId);
            return task;
        } catch (error) {
            throw ("Error when searching for tag by ID");
        }
    }
}
