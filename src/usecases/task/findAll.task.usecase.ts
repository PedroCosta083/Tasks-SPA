import Task from "../../domain/task/task.entity";
import TaskRepository from "../../repository/taskRepository/task.repository";


export class FindAllTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(): Promise<Task[] | null> {
        try {
            const task = await this.taskRepository.findAll();
            return task;
        } catch (error) {
            console.error("Error when searching all Tasks:", error);
            return null;
        }
    }
}
