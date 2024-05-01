import { Injectable } from "@nestjs/common";
import TaskRepository from "../../repository/taskRepository/task.repository";

@Injectable()
export default class DeleteTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }

    async execute(taskID: string): Promise<void> {
        const foundTask = await this.taskRepository.findById(taskID);
        if (foundTask) {
            await this.taskRepository.delete(taskID);
        }
        else {
            throw ("Task not found")
        }
    }
}
