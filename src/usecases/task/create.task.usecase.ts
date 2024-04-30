import Task, { TaskProps } from "../../domain/task/task.entity";
import TaskRepository from "../../repository/taskRepository/task.repository";


export default class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepository) { }

    async execute(taskData: TaskProps): Promise<void> {
        const task = new Task(taskData);
        try {
            return await this.taskRepository.create(task);
        } catch (error) {
            throw ("Error creating task");
        }
    }
}
