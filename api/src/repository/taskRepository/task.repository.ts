import { PrismaClient } from '@prisma/client';
import TaskRepositoryInterface from '../../domain/task/task.repository.interface';
import Task from '../../domain/task/task.entity';
import { Tag } from '../../domain/tags/tags.entity';
import { connect } from 'http2';
import { Injectable } from '@nestjs/common';

const prisma = new PrismaClient();
@Injectable()
export default class TaskRepository implements TaskRepositoryInterface {

    async findByTitle(title: string): Promise<Task[] | null> {
        try {
            const tasksFound = await prisma.task.findMany({ where: { title: { contains: title } }, include: { tags: true } });
            if (tasksFound.length === 0) {
                return null;
            }
            else {
                const tasks = tasksFound.map(task => {
                    const tags = task.tags.map(tag => new Tag({
                        id: tag.id,
                        active: tag.active,
                        createdAt: tag.createdAt,
                        updatedAt: tag.updatedAt,
                        deactivatedAt: tag.deactivatedAt,
                        name: tag.name
                    }));
                    return new Task({
                        id: task.id,
                        active: task.active,
                        createdAt: task.createdAt,
                        updatedAt: task.updatedAt,
                        deactivatedAt: task.deactivatedAt,
                        title: task.title,
                        description: task.description,
                        dateTime: task.dateTime,
                        duration: task.duration,
                        tags: tags
                    })
                });
                return tasks
            }
        } catch (error) {
            console.error("Error getting tasks:", error);
            return null;
        }
    }
    async findAllByTag(tagId: string): Promise<Task[] | null> {
        try {
            const tasksFound = await prisma.task.findMany({ where: { tags: { some: { id: tagId } } }, include: { tags: true } });
            if (tasksFound.length === 0) {
                return null;
            } else {
                const tasks = tasksFound.map(task => {
                    const tags = task.tags.map(tag => new Tag({
                        id: tag.id,
                        active: tag.active,
                        createdAt: tag.createdAt,
                        updatedAt: tag.updatedAt,
                        deactivatedAt: tag.deactivatedAt,
                        name: tag.name
                    }));
                    return new Task({
                        id: task.id,
                        active: task.active,
                        createdAt: task.createdAt,
                        updatedAt: task.updatedAt,
                        deactivatedAt: task.deactivatedAt,
                        title: task.title,
                        description: task.description,
                        dateTime: task.dateTime,
                        duration: task.duration,
                        tags: tags
                    });
                });
                return tasks;
            }
        } catch (error) {
            console.error("Error getting tasks:", error);
            return null;
        }
    }

    async findById(taskId: string): Promise<Task | null> {
        const taskFound = await prisma.task.findUnique({ where: { id: taskId }, include: { tags: true } });
        if (!taskFound) {
            return null;
        }
        let tags
        if (taskFound.tags.length > 0) {
            tags = taskFound.tags.map(tag => new Tag({
                id: tag.id,
                active: tag.active,
                createdAt: tag.createdAt,
                updatedAt: tag.updatedAt,
                deactivatedAt: tag.deactivatedAt,
                name: tag.name
            }));
        }

        const tasks = new Task({
            id: taskFound.id,
            active: taskFound.active,
            createdAt: taskFound.createdAt,
            updatedAt: taskFound.updatedAt,
            deactivatedAt: taskFound.deactivatedAt,
            title: taskFound.title,
            description: taskFound.description,
            dateTime: taskFound.dateTime,
            duration: taskFound.duration,
            tags: tags
        });
        return tasks;

    }

    async findAll(): Promise<Task[] | null> {
        try {
            const tasksFound = await prisma.task.findMany({ include: { tags: true } });
            if (tasksFound.length === 0) {
                return null;
            }
            else {
                const tasks = tasksFound.map(task => {
                    const tags = task.tags.map(tag => new Tag({
                        id: tag.id,
                        active: tag.active,
                        createdAt: tag.createdAt,
                        updatedAt: tag.updatedAt,
                        deactivatedAt: tag.deactivatedAt,
                        name: tag.name
                    }));
                    return new Task({
                        id: task.id,
                        active: task.active,
                        createdAt: task.createdAt,
                        updatedAt: task.updatedAt,
                        deactivatedAt: task.deactivatedAt,
                        title: task.title,
                        description: task.description,
                        dateTime: task.dateTime,
                        duration: task.duration,
                        tags: tags
                    })
                });
                return tasks
            }
        } catch (error) {
            console.error("Error getting tasks:", error);
            return null;
        }
    }

    async create(task: Task): Promise<void> {
        try {
            let tagsToConnect: { id: string }[] = [];
            if (task.tags.length > 0) {
                const existingTags = await prisma.tag.findMany({
                    where: {
                        OR: task.tags.map(tag => ({ name: tag.name })),
                    },
                });
                for (const tag of task.tags) {
                    const existingTag = existingTags.find(t => t.name === tag.name);
                    if (existingTag) {
                        tagsToConnect.push({ id: existingTag.id });
                    } else {
                        const newTag = await prisma.tag.create({
                            data: {
                                id: tag.id,
                                active: tag.active,
                                createdAt: tag.createdAt,
                                updatedAt: tag.updatedAt,
                                deactivatedAt: tag.deactivatedAt,
                                name: tag.name
                            },
                        });
                        tagsToConnect.push({ id: newTag.id });
                    }
                }
            }
            await prisma.task.create({
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
                        connect: tagsToConnect,
                    },
                },
            });
            console.log("Task created successfully!");
        } catch (error) {
            console.error("Error creating task:" + task.title, error);
            throw error;
        }
    }


    async update(entity: Task): Promise<void> {
        try {
            let tagsToConnect: { id: string }[] = [];
            if (entity.tags.length > 0) {
                const existingTags = await prisma.tag.findMany({
                    where: {
                        OR: entity.tags.map(tag => ({ name: tag.name })),
                    },
                });
                for (const tag of entity.tags) {
                    const existingTag = existingTags.find(t => t.name === tag.name);
                    if (existingTag) {
                        tagsToConnect.push({ id: existingTag.id });
                    } else {
                        const newTag = await prisma.tag.create({
                            data: {
                                id: tag.id,
                                active: tag.active,
                                createdAt: tag.createdAt,
                                updatedAt: tag.updatedAt,
                                deactivatedAt: tag.deactivatedAt,
                                name: tag.name
                            },
                        });
                        tagsToConnect.push({ id: newTag.id });
                    }
                }
            }
            await prisma.task.update({
                where: { id: entity.id },
                data: {
                    active: entity.active,
                    createdAt: entity.createdAt,
                    updatedAt: entity.updatedAt,
                    deactivatedAt: entity.deactivatedAt,
                    title: entity.title,
                    description: entity.description,
                    dateTime: entity.dateTime,
                    duration: entity.duration,
                    tags: {
                        connect: tagsToConnect,
                    },
                },
            });

            console.log("Task updated successfully!");
        } catch (error) {
            console.error("Error updating task:", error);
            throw error;
        }
    }



    async delete(id: string): Promise<void> {
        await prisma.task.delete({ where: { id: id } });
    }

    async deleteAll(): Promise<void> {
        try {
            await prisma.task.deleteMany();
        } catch (error) {
            console.error("Error deleting all tasks:", error);
        }
    }
}
