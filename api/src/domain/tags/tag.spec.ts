import { Tag, TagsProps } from "../tags/tags.entity";
import Task, { TaskProps } from "../task/task.entity";

describe('Tag Validation', () => {

    const validTaskProps: TaskProps = {
        title: "Task 1",
        description: "Description for task 1",
        dateTime: new Date(new Date().getTime() + 1000 * 60 * 5),
        duration: 60,
    };

    const validTagProps: TagsProps = {
        name: "Tag 1",
    };

    it('Name must be a non-empty string', () => {
        const invalidTag = () => new Tag({
            name: "",
            task: []
        });
        expect(invalidTag).toThrow('Name is required and must be a non-empty string.');
    });

    it('Name must have less than 50 characters', () => {
        const longName = "a".repeat(51);
        const invalidTag = () => new Tag({
            name: longName,
            task: []
        });
        expect(invalidTag).toThrow('Name must be less than 50 characters.');
    });

    it('All tasks must be instances of Task', () => {
        const invalidTag = () => new Tag({
            name: "Valid Tag",
            task: [{} as Task]
        });
        expect(invalidTag).toThrow('All tasks must be instances of Task.');
    });

    it('Valid tag should not throw any errors', () => {
        const validTag = () => new Tag(validTagProps);
        expect(validTag).not.toThrow();
    });

    it("should create a new tag instance with all valid properties", () => {
        const validTag = new Tag(validTagProps);
        const task = new Task(validTaskProps);
        validTag.addTask(task);
        expect(validTag.name).toBe("Tag 1");
        expect(validTag.task.length).toBe(1);
        expect(validTag.task).toContainEqual(task);
    });

    it("should add a task to the tag", () => {
        const validTag = new Tag(validTagProps);
        const task1 = new Task(validTaskProps);
        validTag.addTask(task1);
        const newTaskProps: TaskProps = {
            title: "New Task",
            description: "Description for new task",
            dateTime: new Date(),
            duration: 60,
        };
        const newTask = new Task(newTaskProps);
        validTag.addTask(newTask);
        expect(validTag.task.length).toBe(2);
        expect(validTag.task).toContainEqual(newTask);
    });

    it("should not add a duplicate task to the tag", () => {
        const validTag = new Tag(validTagProps);
        const existingTask = validTag.task[0];
        validTag.addTask(existingTask);
        expect(validTag.task.length).toBe(1);
    });

    it("should remove a task from the tag", () => {
        const validTag = new Tag(validTagProps);
        const task1 = new Task(validTaskProps);
        validTag.addTask(task1);
        const taskIdToRemove = validTag.task[0].id;
        validTag.removeTask(taskIdToRemove);
        expect(validTag.task.length).toBe(0);
    });
});
