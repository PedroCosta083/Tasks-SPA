import { PrismaClient } from '@prisma/client';
import TagsRepositoryInterface from '../domain/tags/tags.repository.Interface';
import { Tag } from '../domain/tags/tags.entity';
import Task from '../domain/task/task.entity';

const prisma = new PrismaClient();

export default class TagsRepository implements TagsRepositoryInterface {
    async findById(tagId: string): Promise<Tag | null> {
        const tagFound = await prisma.tag.findUnique({
            where: { id: tagId },
            include: {
                tasks: true
            }
        });
        if (!tagFound) {
            return null
        }
        const tasks = tagFound.tasks.map(task => new Task({
            id: task.id,
            active: task.active,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
            deactivatedAt: task.deactivatedAt,
            title: task.title,
            description: task.description,
            dateTime: task.dateTime,
            duration: task.duration,
        }));
        const tag = new Tag({
            id: tagFound.id,
            active: tagFound.active,
            createdAt: tagFound.createdAt,
            updatedAt: tagFound.updatedAt,
            deactivatedAt: tagFound.deactivatedAt,
            name: tagFound.name,
            task: tasks

        })
        return tag
    }

    async findByName(name: string): Promise<Tag | null> {
        let tag
        const tagFound = await prisma.tag.findFirst({
            where: { name: name },
            include: {
                tasks: true
            }
        });
        if (!tagFound) {
            return tag = null
        } else {

            const tasks = tagFound.tasks.map(task => new Task({
                id: task.id,
                active: task.active,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
                deactivatedAt: task.deactivatedAt,
                title: task.title,
                description: task.description,
                dateTime: task.dateTime,
                duration: task.duration,
            }));
            tag = new Tag({
                id: tagFound.id,
                active: tagFound.active,
                createdAt: tagFound.createdAt,
                updatedAt: tagFound.updatedAt,
                deactivatedAt: tagFound.deactivatedAt,
                name: tagFound.name,
                task: tasks

            })
            return tag
        }
    }

    async findAll(): Promise<Tag[] | null> {
        try {
            const tagsFound = await prisma.tag.findMany({ include: { tasks: true } });

            if (tagsFound.length === 0) {
                return null;
            }
            else {
                const tags = tagsFound.map(tag => {
                    const tasks = tag.tasks.map(task => new Task({
                        id: task.id,
                        active: task.active,
                        createdAt: task.createdAt,
                        updatedAt: task.updatedAt,
                        deactivatedAt: task.deactivatedAt,
                        title: task.title,
                        description: task.description,
                        dateTime: task.dateTime,
                        duration: task.duration,
                    }));

                    return new Tag({
                        id: tag.id,
                        active: tag.active,
                        createdAt: tag.createdAt,
                        updatedAt: tag.updatedAt,
                        deactivatedAt: tag.deactivatedAt,
                        name: tag.name,
                        task: tasks
                    });
                });
                return tags;
            }

        } catch (error) {
            console.error("Erro ao buscar tags:", error);
            return null;
        }
    }


    async create(tag: Tag): Promise<void> {
        let newTagData
        if (tag.task.length > 0) {
            const existingTasks = await prisma.task.findMany({
                where: {
                    OR: tag.task.map(task => ({ id: task.id })),
                },
            });
            const taskToConnectOrCreate = tag.task.filter(task => !existingTasks.some(existingTasks => existingTasks.id === task.id));
            newTagData = await prisma.tag.create({
                data: {
                    id: tag.id,
                    active: tag.active,
                    createdAt: tag.createdAt,
                    updatedAt: tag.updatedAt,
                    deactivatedAt: tag.deactivatedAt,
                    name: tag.name,
                    tasks: {
                        connectOrCreate: taskToConnectOrCreate.map(task => ({
                            where: { id: task.id },
                            create: {
                                id: task.id,
                                active: task.active,
                                createdAt: task.createdAt,
                                updatedAt: task.updatedAt,
                                deactivatedAt: task.deactivatedAt,
                                dateTime: task.dateTime,
                                description: task.description,
                                duration: task.duration,
                                title: task.title
                            }
                        }))
                    }
                },
            });
        }
        else {
            newTagData = await prisma.tag.create({
                data: {
                    id: tag.id,
                    active: tag.active,
                    createdAt: tag.createdAt,
                    updatedAt: tag.updatedAt,
                    deactivatedAt: tag.deactivatedAt,
                    name: tag.name
                }
            });
        }
    }

    async update(entity: Tag): Promise<void> {
        let newTagData
        if (entity.task.length > 0) {
            const existingTasks = await prisma.task.findMany({
                where: {
                    OR: entity.task.map(task => ({ id: task.id })),
                },
            });
            const taskToConnectOrCreate = entity.task.filter(task => !existingTasks.some(existingTasks => existingTasks.id === task.id));
            newTagData = await prisma.tag.update({
                where: { id: entity.id },
                data: {
                    id: entity.id,
                    active: entity.active,
                    createdAt: entity.createdAt,
                    updatedAt: entity.updatedAt,
                    deactivatedAt: entity.deactivatedAt,
                    name: entity.name,
                    tasks: {
                        connectOrCreate: taskToConnectOrCreate.map(task => ({
                            where: { id: task.id },
                            create: {
                                id: task.id,
                                active: task.active,
                                createdAt: task.createdAt,
                                updatedAt: task.updatedAt,
                                deactivatedAt: task.deactivatedAt,
                                dateTime: task.dateTime,
                                description: task.description,
                                duration: task.duration,
                                title: task.title
                            }
                        }))
                    }
                },
            });
        }
        else {
            newTagData = await prisma.tag.update({
                where: { id: entity.id },
                data: {
                    id: entity.id,
                    active: entity.active,
                    createdAt: entity.createdAt,
                    updatedAt: entity.updatedAt,
                    deactivatedAt: entity.deactivatedAt,
                    name: entity.name
                }
            });
        }
    }

    async delete(id: string): Promise<void> {
        await prisma.tag.delete({ where: { id: id } });
    }
    async deleteAll(): Promise<void> {
        try {
            await prisma.tag.deleteMany();
        } catch (error) {
            console.error("Erro ao excluir todas as tags:", error);
        }
    }
}
