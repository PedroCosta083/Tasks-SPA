import { Tag, TagsProps } from "../tags/tags.entity";
import Task, { TaskProps } from "./task.entity";

describe('Task Validation', () => {


    const validTaskProps = {
        title: "Task 1",
        description: "Description for task 1",
        dateTime: new Date(new Date().getTime() + 1000 * 60 * 5),
        duration: 60,
    };


    it('Title must be a non-empty string', () => {
        const invalidTask = () => new Task({
            title: "",
            description: "Description Task 1",
            dateTime: new Date(),
            duration: 200
        });
        expect(invalidTask).toThrow('Title cannot be empty.');
    });

    it('Description must be a non-empty string', () => {
        const invalidTask = () => new Task({
            title: "Title Task 1",
            description: "",
            dateTime: new Date(),
            duration: 200
        });
        expect(invalidTask).toThrow('Description cannot be empty.');
    });

    it('DateTime must be a valid Date instance', () => {
        const invalidTask = () => new Task({
            title: 'Task Title',
            description: 'Task description',
            dateTime: 'invalidDate' as any,
            duration: 60,
        });
        expect(invalidTask).toThrow('Invalid date or date in the past.');
    });

    it('Duration must be a positive integer', () => {
        const invalidTask = () => new Task({
            title: 'Task Title',
            description: 'Task description',
            dateTime: new Date(),
            duration: -10,
        });
        expect(invalidTask).toThrow('Invalid duration.');
    });

    it('Valid task should not throw any errors', () => {
        const validTask = () => new Task({
            title: 'Task Title',
            description: 'Task description',
            dateTime: new Date(),
            duration: 60,
        });
        expect(validTask).not.toThrow();
    });

    it("should create a new task instance with all valid properties", () => {
        const validTask = new Task(validTaskProps);
        const tag = [new Tag({ name: "Tag1" })]
        validTask.addTag(tag)
        expect(validTask.title).toBe("Task 1");
        expect(validTask.description).toBe("Description for task 1");
        expect(validTask.dateTime).toBeInstanceOf(Date);
        expect(validTask.duration).toBe(60);
        expect(validTask.tags.length).toBe(1);
    });

    it("should add a tag to the task", () => {
        const validTask = new Task(validTaskProps);
        const tag1 = new Tag({ name: "Tag 1" });
        const tag2 = new Tag({ name: "Tag 2" });

        validTask.addTag([tag1, tag2]);

        expect(validTask.tags.length).toBe(2);
        expect(validTask.tags).toContainEqual(tag1);
        expect(validTask.tags).toContainEqual(tag2);
    });


    it("should not add a duplicate tag to the task", () => {
        const validTask = new Task(validTaskProps);
        const tag1 = new Tag({ name: "Tag1" });
        validTask.addTag([tag1]);
        validTask.addTag([tag1]);
        expect(validTask.tags.length).toBe(1);
    });


    it("should remove a tag from the task", () => {
        const validTask = new Task(validTaskProps);
        const tag = new Tag({ name: "Tag1" })
        validTask.addTag([tag]);
        const tagIdToRemove = validTask.tags[0].id;
        validTask.removeTag(tagIdToRemove);
        expect(validTask.tags.length).toBe(0);
    });
});
