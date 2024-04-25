import Base from "../../domain/generic/base.entity";
import BaseRepositoryInterface from "../../domain/generic/base.reposository.interface";

export default class ActivateUseCase <T extends Base>{
    constructor(private repository: BaseRepositoryInterface<T>) { }

    async execute(entityId: string, activate : boolean): Promise<void | string[]> {
        try {
            const entity = await this.repository.activate(entityId,activate);
            return entity;
        } catch (error) {
            console.error("Error getting entity:", error);
            return ["Error getting entity. Please try again later."];
        }
    }
}
