import Task from "../../domain/task/task.entity";
import TaskRepositoryInterface from "../../domain/task/task.repository.interface";

export default class AddTaskUseCase {
    constructor(private taskRepository: TaskRepositoryInterface) {}

    async execute(taskData: Task): Promise<void | string []> {
        const errors = taskData.validateTask();
        if (errors.length > 0) {
            return errors; // Retorna os erros de validação
        }

        try {
            const createdTask = await this.taskRepository.add(taskData);
            return createdTask;
        } catch (error) {
            // Trate qualquer erro que possa ocorrer ao criar a tarefa
            console.error("Erro ao criar a tarefa:", error);
            return ["Erro ao criar a tarefa. Por favor, tente novamente mais tarde."];
        }
    }
}
