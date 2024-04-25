import Base from "../../domain/generic/base.entity";
import BaseRepositoryInterface from "../../domain/generic/base.reposository.interface";

export default class FindByIdUseCase<T extends Base> {
    constructor(private repository: BaseRepositoryInterface<T>) { }

    async execute(entityTitle: string): Promise<T | null | string[]> {
        try {
            const entity = await this.repository.findByID(entityTitle);
            if (!entity) {
                return ["entity not Found"]; 
            }
            return entity;
        } catch (error) {
            console.error("Error getting entity:", error);
            return ["Error getting entity. Please try again later."];
        }
    }
}
