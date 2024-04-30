
import { Tag } from "../../domain/tags/tags.entity";
import Task from "../../domain/task/task.entity";
import TaskRepository from "../../repository/taskRepository/task.repository";

export default class FindAllTasksByTagUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(tag: Tag): Promise<Task[] | null> {
        try {
            const tasks = await this.taskRepository.findAllByTag(tag.id);
            return tasks;
        } catch (error) {
            console.error("Error getting task:", error);
            return null
        }
    }
}
