import Base from "../../domain/generic/base.entity";
import BaseRepositoryInterface from "../../domain/generic/base.reposository.interface";

export default class AddEntityUseCase<T extends Base> {
    constructor(private repository: BaseRepositoryInterface<T>) {}

    async execute(entityData: T): Promise<void | string[]> {
        const errors = entityData.validate();
        if (errors.length > 0) {
            return errors;
        }
        try {
            const createdEntity = await this.repository.add(entityData);
            return createdEntity;
        } catch (error) {
            console.error("Error creating entity:", error);
            return ["Error creating the entity. Please try again later."];
        }
    }
}
