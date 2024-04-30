import { PrismaClient } from "@prisma/client";
import TaskRepository from "./task.repository";
import Task from "../../domain/task/task.entity";
import { Tag } from "../../domain/tags/tags.entity";
import TagsRepository from "../tagRepositoy/tags.repository";


describe('TaskRepository', () => {
    const prisma = new PrismaClient();
    const repository = new TaskRepository();
    const repositoryTag = new TagsRepository();
    const now = new Date();
    now.setMinutes(now.getMinutes() + 2);
    beforeEach(async () => {
        await prisma.task.deleteMany();
        await prisma.tag.deleteMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should find tasks by title', async () => {
        const task1 = new Task({
            title: 'Task 1',
            description: 'Desciption Task',
            dateTime: now,
            duration: 100
        });
        const task2 = new Task({
            title: 'Task 1',
            description: 'Desciption Task',
            dateTime: now,
            duration: 100
        });
        await repository.create(task1);
        await repository.create(task2);

        const result = await repository.findByTitle('Task 1');

        expect(result).toHaveLength(2);
        expect(result![0].title).toBe('Task 1');
        expect(result![1].title).toBe('Task 1');
    });

    it('should create a new task', async () => {
        const task = new Task({
            title: 'Task 1',
            description: 'Desciption Task',
            dateTime: now,
            duration: 100
        });

        await repository.create(task);
        const createdTask = await prisma.task.findUnique({ where: { id: task.id } });
        expect(createdTask).toBeDefined();
        expect(createdTask!.title).toBe(task.title)
        expect(createdTask!.description).toBe(task.description)
        expect(createdTask!.dateTime).toEqual(task.dateTime)
        expect(createdTask!.duration).toBe(task.duration)
    });

    it('should update an existing task', async () => {
        const existingTask = new Task({
            title: 'Task 1',
            description: 'Desciption Task',
            dateTime: now,
            duration: 100
        });
        await repository.create(existingTask);

        const updatedTask = new Task({
            id: existingTask.id,
            title: 'Updated Task',
            description: 'Updated Task',
            dateTime: now,
            duration: 100
        });
        await repository.update(updatedTask);

        const fetchedTask = await prisma.task.findUnique({ where: { id: existingTask.id } });
        expect(fetchedTask).toBeDefined();
        expect(fetchedTask!.title).toBe('Updated Task');
    });

    it('should delete an existing task', async () => {
        const existingTask = new Task({
            title: 'Task 1',
            description: 'Desciption Task',
            dateTime: now,
            duration: 100
        });
        await repository.create(existingTask);
        await repository.delete(existingTask.id);
        const fetchedTask = await prisma.task.findUnique({ where: { id: existingTask.id } });
        expect(fetchedTask).toBeNull();
    });

    it('should find all tasks', async () => {
        await repository.create(new Task({
            title: 'Task 1',
            description: 'Description Task',
            dateTime: now,
            duration: 100,
        }));
        await repository.create(new Task({
            title: 'Task 2',
            description: 'Description Task',
            dateTime: now,
            duration: 100,
        }));
        await repository.create(new Task({
            title: 'Task 3',
            description: 'Description Task',
            dateTime: now,
            duration: 100,
        }));
        const tasks = await repository.findAll();
        expect(tasks).toHaveLength(3);
    });

    it('should find a task by ID', async () => {
        const newTask = new Task({
            title: 'Task 1',
            description: 'Description Task',
            dateTime: now,
            duration: 100,
        })
        await repository.create(newTask);
        const foundTask = await repository.findById(newTask.id);
        expect(foundTask).toBeDefined();
        expect(foundTask!.id).toBe(newTask.id);
    });

    it('should find all tasks by tag', async () => {
        const newTag1 = new Tag({
            name: "Tag1"
        });
        const newTag2 = new Tag({
            name: "Tag2"
        });
        await repositoryTag.create(newTag1)
        await repositoryTag.create(newTag2)
        const newTask1 = new Task({
            title: 'Task 1',
            description: 'Description Task',
            dateTime: now,
            duration: 100,
            tags: [newTag1],
        });
        const newTask2 = new Task({
            title: 'Task 2',
            description: 'Description Task',
            dateTime: now,
            duration: 100,
            tags: [newTag2],
        });
        const newTask3 = new Task({
            title: 'Task 3',
            description: 'Description Task',
            dateTime: now,
            duration: 100,
            tags: [newTag1, newTag2],
        });

        await repository.create(newTask1)
        await repository.create(newTask2)
        await repository.create(newTask3)
        const tasksWithTag1 = await repository.findAllByTag(newTag1.id);
        const tasksWithTag2 = await repository.findAllByTag(newTag2.id);

        expect(tasksWithTag1).toHaveLength(2);
        expect(tasksWithTag2).toHaveLength(2);
    });


});
