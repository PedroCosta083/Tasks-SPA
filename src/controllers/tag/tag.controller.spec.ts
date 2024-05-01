import { Test, TestingModule } from '@nestjs/testing';
import { TagController } from './tag.controller';
import CreateTagUseCase from '../../usecases/tags/create.tag.usecase';
import DeleteTagUseCase from '../../usecases/tags/delete.tag.usecase';
import { FindAllTagsUseCase } from '../../usecases/tags/findAll.tag.usecase';
import FindTagByNameUseCase from '../../usecases/tags/findByName.tag.usecase';
import { FindTagByIdUseCase } from '../../usecases/tags/findById.tag.usecase';
import UpdateTagUseCase from '../../usecases/tags/update.tag.usecase';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import TagsRepository from '../../repository/tagRepositoy/tags.repository';
import { Tag } from '../../domain/tags/tags.entity';

describe('TagController', () => {
  let controller: TagController;
  let createTagUseCase: CreateTagUseCase;
  let deleteTagUseCase: DeleteTagUseCase;
  let findAllTagsUseCase: FindAllTagsUseCase;
  let findTagByNameUseCase: FindTagByNameUseCase;
  let findTagByIdUseCase: FindTagByIdUseCase;
  let updateTagUseCase: UpdateTagUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        CreateTagUseCase,
        DeleteTagUseCase,
        FindAllTagsUseCase,
        FindTagByNameUseCase,
        FindTagByIdUseCase,
        UpdateTagUseCase,
        TagsRepository
      ],
    }).compile();

    controller = module.get<TagController>(TagController);
    createTagUseCase = module.get<CreateTagUseCase>(CreateTagUseCase);
    deleteTagUseCase = module.get<DeleteTagUseCase>(DeleteTagUseCase);
    findAllTagsUseCase = module.get<FindAllTagsUseCase>(FindAllTagsUseCase);
    findTagByNameUseCase = module.get<FindTagByNameUseCase>(FindTagByNameUseCase);
    findTagByIdUseCase = module.get<FindTagByIdUseCase>(FindTagByIdUseCase);
    updateTagUseCase = module.get<UpdateTagUseCase>(UpdateTagUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const tags = [{ id: '1', name: 'Tag 1' }, { id: '2', name: 'Tag 2' }];
      jest.spyOn(findAllTagsUseCase, 'execute').mockResolvedValue(tags as Tag[]);

      expect(await controller.findAll()).toEqual(tags);
    });

    it('should throw NotFoundException when no tags are found', async () => {
      jest.spyOn(findAllTagsUseCase, 'execute').mockResolvedValue(null);

      await expect(controller.findAll()).rejects.toThrow(NotFoundException);
    });
  });
  describe('TagController', () => {
    // Código anterior...

    describe('findById', () => {
      it('should return the tag with the specified ID', async () => {
        const tag = { id: '1', name: 'Tag 1' };
        jest.spyOn(findTagByIdUseCase, 'execute').mockResolvedValue(tag as Tag);

        expect(await controller.findById('1')).toEqual(tag);
      });

      it('should throw NotFoundException when tag is not found', async () => {
        jest.spyOn(findTagByIdUseCase, 'execute').mockResolvedValue(null);

        await expect(controller.findById('1')).rejects.toThrow(NotFoundException);
      });
    });

    describe('findByName', () => {
      it('should return an array of tags with the specified name', async () => {
        const tagName = 'Tag';
        const tags = [{ id: '1', name: 'Tag 1' }, { id: '2', name: 'Tag 2' }];
        jest.spyOn(findTagByNameUseCase, 'execute').mockResolvedValue(tags as Tag[]);

        expect(await controller.findByName(tagName)).toEqual(tags);
      });

      it('should throw NotFoundException when no tags are found with the specified name', async () => {
        const tagName = 'NonexistentTag';
        jest.spyOn(findTagByNameUseCase, 'execute').mockResolvedValue(null);

        await expect(controller.findByName(tagName)).rejects.toThrow(NotFoundException);
      });
    });

    describe('create', () => {
      it('should create a new tag', async () => {
        const createTagDto = { name: 'New Tag' };
        jest.spyOn(createTagUseCase, 'execute').mockResolvedValue(void 0);

        await expect(controller.create(createTagDto)).resolves.toBeUndefined();
      });

      it('should throw InternalServerErrorException if an error occurs during tag creation', async () => {
        const createTagDto = { name: 'New Tag' };
        jest.spyOn(createTagUseCase, 'execute').mockRejectedValue(new Error('Error creating tag'));

        await expect(controller.create(createTagDto)).rejects.toThrow(InternalServerErrorException);
      });
    });


    describe('update', () => {
      it('should update an existing tag', async () => {
        const updateTagDto = { name: 'Updated Tag' };
        const tagId = '1';
        jest.spyOn(updateTagUseCase, 'execute').mockResolvedValue(undefined);

        await expect(controller.update(tagId, updateTagDto)).resolves.toBeUndefined();
      });

      it('should throw InternalServerErrorException if an error occurs during tag update', async () => {
        const updateTagDto = { name: 'Updated Tag' };
        const tagId = '1';
        jest.spyOn(updateTagUseCase, 'execute').mockRejectedValue(new Error('Error updating tag'));

        await expect(controller.update(tagId, updateTagDto)).rejects.toThrow(InternalServerErrorException);
      });
    });

    describe('delete', () => {
      it('should delete an existing tag', async () => {
        const tagId = '1';
        jest.spyOn(deleteTagUseCase, 'execute').mockResolvedValue(undefined);

        await expect(controller.delete(tagId)).resolves.toBeUndefined();
      });

      it('should throw InternalServerErrorException if an error occurs during tag deletion', async () => {
        const tagId = '1';
        jest.spyOn(deleteTagUseCase, 'execute').mockRejectedValue(new Error('Error deleting tag'));

        await expect(controller.delete(tagId)).rejects.toThrow(InternalServerErrorException);
      });
    });
  });
});
