import { Tag } from "../../domain/tags/tags.entity";
import Task from "../../domain/task/task.entity";
import TagsRepository from "./tags.repository";


describe('Tag Repository', () => {
    beforeEach(async () => {
        await tagsRepository.deleteAll();
    });

    const validTaskProps = {
        id: "1",
        title: "Task 1",
        description: "Description for task 1",
        dateTime: new Date(new Date().getTime() + 1000 * 60 * 5),
        duration: 60,
    };
    const validTagProps = {
        id: "1",
        name: "Tag 1",
        task: [new Task(validTaskProps)]
    };



    const tagsRepository = new TagsRepository();

    it('should find a tag by ID', async () => {
        const newTag = new Tag(validTagProps)
        await tagsRepository.create(newTag)
        const tag = await tagsRepository.findTagById("1");
        expect(tag).toBeInstanceOf(Tag);
        expect(tag?.name).toBe("Tag 1");
    });

    it('should find a tag by name', async () => {
        const newTag = new Tag(validTagProps)
        await tagsRepository.create(newTag)
        const tag = await tagsRepository.findByName("Tag 1");
        expect(tag).toBeInstanceOf(Tag);
        expect(tag?.name).toBe("Tag 1");
    });

    it('should find all tags', async () => {
        const newTag = new Tag(validTagProps)
        await tagsRepository.create(newTag)
        const newTag2 = new Tag({
            id: "2",
            name: "Tag 2",
            task: []
        })
        await tagsRepository.create(newTag2)
        const tags = await tagsRepository.findAll();
        expect(tags).toBeInstanceOf(Array);
        expect(tags?.length).toBeGreaterThan(0);
        expect(tags?.[0]).toBeInstanceOf(Tag);
    });

    it('should create a tag', async () => {
        const tag = new Tag(validTagProps);
        await tagsRepository.create(tag);
        const createdTag = await tagsRepository.findTagById("1");
        expect(createdTag).toBeDefined();
        expect(createdTag?.name).toBe("Tag 1");
    });

    it('should update a tag', async () => {
        const tag = new Tag(validTagProps);
        await tagsRepository.create(tag)
        const tagFound = await tagsRepository.findTagById("1");
        let newTag
        if (tagFound) {
            newTag = new Tag({
                id: tagFound.id,
                active: tagFound.active,
                createdAt: tagFound.createdAt,
                updatedAt: new Date(),
                deactivatedAt: tagFound.deactivatedAt,
                name: "Updated Tag",
                task: tagFound.task
            })
        }
        await tagsRepository.update(newTag!);
        const updatedTag = await tagsRepository.findTagById("1");
        expect(updatedTag?.name).toBe("Updated Tag");
    });

    it('should delete a tag', async () => {
        const tag = new Tag(validTagProps);
        await tagsRepository.create(tag)
        await tagsRepository.delete("1");
        const deletedTag = await tagsRepository.findTagById("1");
        expect(deletedTag).toBeNull();
    });

    it('should delete all tags', async () => {
        const tag = new Tag(validTagProps);
        await tagsRepository.create(tag)
        const tag2 = new Tag({
            id: "2",
            name: "Tag 2",
            task: [new Task(validTaskProps)]
        });
        await tagsRepository.create(tag2)
        await tagsRepository.deleteAll();
        const tags = await tagsRepository.findAll();
        expect(tags).toBeNull();
    });
});
