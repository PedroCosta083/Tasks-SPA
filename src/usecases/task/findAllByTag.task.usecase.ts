
import Task from "../../domain/task/task.entity";
import TaskRepositoryInterface from "../../domain/task/task.repository.interface";

export default class FindTasksByTagUseCase {
    constructor(private taskRepository: TaskRepositoryInterface) { }

    async execute(tagId: string): Promise<Task[] | null> {
        try {
            const tasks = await this.taskRepository.findAllByTag(tagId);
            return tasks;
        } catch (error) {
            console.error("Error getting task:", error);
            return null
        }
    }
}
