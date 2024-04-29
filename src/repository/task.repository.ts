import { PrismaClient } from '@prisma/client';
import TaskRepositoryInterface from '../domain/task/task.repository.interface';
import Task from '../domain/task/task.entity';
import { Tag } from '../domain/tags/tags.entity';

const prisma = new PrismaClient();

export default class TaskRepository implements TaskRepositoryInterface {
    findAllByTag(tagId: string): Promise<Task[] | null> {
        throw new Error('Method not implemented.');
    }
    findByTitle(title: string): Promise<Task[] | null> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<Task[] | null> {
        throw new Error('Method not implemented.');
    }
    async create(task: Task): Promise<void> {
        let newTaskData;
        if (task.tags.length > 0) {
            const existingTags = await prisma.tag.findMany({
                where: {
                    OR: task.tags.map(tag => ({ name: tag.name })),
                },
            });
            const tagsToConnectOrCreate = task.tags.filter(tag => !existingTags.some(existingTag => existingTag.name === tag.name));

            newTaskData = await prisma.task.create({
                data: {
                    id: task.id,
                    active: task.active,
                    createdAt: task.createdAt,
                    updatedAt: task.updatedAt,
                    deactivatedAt: task.deactivatedAt,
                    title: task.title,
                    description: task.description,
                    dateTime: task.dateTime,
                    duration: task.duration,
                    tags: {
                        connectOrCreate: tagsToConnectOrCreate.map(tag => ({
                            where: { id: tag.id },
                            create: {
                                id: tag.id,
                                active: tag.active,
                                createdAt: tag.createdAt,
                                updatedAt: tag.updatedAt,
                                deactivatedAt: tag.deactivatedAt,
                                name: tag.name
                            }
                        }))
                    }
                },
            });
        } else {
            newTaskData = await prisma.task.create({
                data: {
                    id: task.id,
                    active: task.active,
                    createdAt: task.createdAt,
                    updatedAt: task.updatedAt,
                    deactivatedAt: task.deactivatedAt,
                    title: task.title,
                    description: task.description,
                    dateTime: task.dateTime,
                    duration: task.duration,
                }
            });
        }
    }

    update(task: Task): Promise<Task> {
        throw new Error('Method not implemented.');
    }
    async findById(id: string): Promise<Task | null> {
        const taskOrNull = prisma.task.findUnique({ where: { id } });
        if (taskOrNull === null) {
            return null;
        } else {
            const task: Task = taskOrNull as unknown as Task;
            return task;
        }
    }


    async delete(id: string): Promise<void> {
        await prisma.task.delete({ where: { id } });
    }
}
