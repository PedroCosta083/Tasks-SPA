import Base from "../../domain/generic/base.entity";
import BaseRepositoryInterface from "../../domain/generic/base.reposository.interface";

export default class UpdateUseCase<T extends Base> {
    constructor(private repository: BaseRepositoryInterface<T>) { }

    async execute(entityId: string, updatedEntityData: T): Promise<T | string[]> {
        const existingEntity = await this.repository.findByID(entityId);
        if (!existingEntity) {
            return ["Task not Found"];
        }

        // Update existing task data with new data
        Object.assign(existingEntity, updatedEntityData);

        // Validate the updated task
        const errors = existingEntity.validate();
        if (errors.length > 0) {
            return errors;
        }

        try {
            const updatedTask = await this.repository.update(existingEntity);
            return updatedTask;
        } catch (error) {
            console.error("Error updating task:", error);
            return ["Error updating task. Please try again later."];
        }
    }
}
