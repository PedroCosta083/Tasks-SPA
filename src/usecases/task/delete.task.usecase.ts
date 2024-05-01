import { Injectable } from "@nestjs/common";
import TaskRepository from "../../repository/taskRepository/task.repository";

@Injectable()
export default class DeleteTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }

    async execute(taskID: string): Promise<void> {
        await this.taskRepository.delete(taskID);
    }
}
