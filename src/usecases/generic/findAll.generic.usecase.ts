import Base from "../../domain/generic/base.entity";
import BaseRepositoryInterface from "../../domain/generic/base.reposository.interface";

export default class FindAllTasksUseCase<T extends Base> {
    constructor(private repository: BaseRepositoryInterface<T>) { }

    async execute(): Promise<T[] | string[]> {
        try {
            const entity = await this.repository.findAll();
            return entity;
        } catch (error) {
            console.error("Error getting entity:", error);
            return ["Error getting entity. Please try again later."];
        }
    }
}

