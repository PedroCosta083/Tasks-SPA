import Task, { TaskProps } from "../../domain/task/task.entity";
import TaskRepositoryInterface from "../../domain/task/task.repository.interface";

export default class CreateTaskUseCase {
    constructor(private taskRepository: TaskRepositoryInterface) { }

    async execute(taskData: TaskProps): Promise<void> {
        const errors = this.validateTaskData(taskData);
        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }
        const task = new Task(taskData);
        try {
            return await this.taskRepository.create(task);
        } catch (error) {
            console.error("Erro ao criar a tarefa:", error);
        }
    }

    private validateTaskData(taskData: TaskProps): string[] {
        const errors: string[] = [];

        if (!taskData.title || taskData.title.trim() === "") {
            errors.push("O título da tarefa é obrigatório.");
        }

        if (!taskData.dateTime || isNaN(taskData.dateTime.getTime())) {
            errors.push("A data e hora da tarefa são inválidas.");
        }

        if (!taskData.duration || isNaN(taskData.duration) || taskData.duration <= 0) {
            errors.push("A duração da tarefa deve ser um número positivo.");
        }

        return errors;
    }
}
