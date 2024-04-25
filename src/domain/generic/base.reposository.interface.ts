
export default interface BaseRepositoryInterface<T> {
    add(entity: T): Promise<void>;
    update(entity: T): Promise<T>;
    activate(entityID: string, activate: boolean): Promise<void>;
    findAll(): Promise<T[]>;
    findByID(entityID: string): Promise<T>;
}
