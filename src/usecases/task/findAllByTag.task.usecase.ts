import { Tags } from "../../domain/tags/tags.entity";
import Task from "../../domain/task/task.entity";
import TaskRepositoryInterface from "../../domain/task/task.repository.interface";

export default class FindTasksByTagUseCase {
    constructor(private taskRepository: TaskRepositoryInterface) {}

    async execute(tag: Tags[]): Promise<Task[] | string[]> {
        try {
            const tasks = await this.taskRepository.findAllByTag(tag);
            return tasks;
        } catch (error) {
            console.error("Error getting task:", error);
            return ["Error getting task. Please try again later."];
        }
    }
}
