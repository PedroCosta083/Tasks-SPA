import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, InternalServerErrorException, Query } from '@nestjs/common';
import { FindTagByIdUseCase } from '../../usecases/tags/findById.tag.usecase';
import CreateTagUseCase from '../../usecases/tags/create.tag.usecase';
import { Tag } from '../../domain/tags/tags.entity';
import UpdateTagUseCase from '../../usecases/tags/update.tag.usecase';
import FindTagByNameUseCase from '../../usecases/tags/findByName.tag.usecase';
import { FindAllTagsUseCase } from '../../usecases/tags/findAll.tag.usecase';
import DeleteTagUseCase from '../../usecases/tags/delete.tag.usecase';
import { CreateTagDTO, UpdateTagDTO } from './dto/tag.dto';

@Controller('tag')
export class TagController {
    constructor(
        private readonly createTagUseCase: CreateTagUseCase,
        private readonly deleteTagUseCase: DeleteTagUseCase,
        private readonly findAllTagsUseCase: FindAllTagsUseCase,
        private readonly findTagByNameUseCase: FindTagByNameUseCase,
        private readonly updateTagUseCase: UpdateTagUseCase,
        private readonly findTagByIdUseCase: FindTagByIdUseCase,
    ) { }

    @Get('tags')
    async findAll(): Promise<Tag[] | null> {
        const tags = await this.findAllTagsUseCase.execute();
        if (!tags) {
            throw new NotFoundException('No tags found.');
        }
        return tags;
    }


    @Get(':id')
    async findById(@Param('id') id: string) {
        const tag = await this.findTagByIdUseCase.execute(id);
        if (!tag) {
            throw new NotFoundException('Tag not found.');
        }
        return tag;
    }

    @Get('/name/search')
    async findByName(@Query('name') name: string): Promise<Tag[]> {
        const tag = await this.findTagByNameUseCase.execute(name);
        if (!tag) {
            throw new NotFoundException('No tag found with the specified name');
        }
        return tag;
    }
    @Post('create')
    async create(@Body() createTagDto: CreateTagDTO) {
        try {
            await this.createTagUseCase.execute(createTagDto);
        } catch (error) {
            throw new InternalServerErrorException('Error creating tag : ' + error);
        }
    }

    @Put('update/:id')
    async update(@Param('id') id: string, @Body() updateTagDTO: UpdateTagDTO) {
        try {
            await this.updateTagUseCase.execute(id, updateTagDTO, updateTagDTO?.tasks);
        } catch (error) {
            throw new InternalServerErrorException('Error updating tag : ' + error);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        try {
            await this.deleteTagUseCase.execute(id);
        } catch (error) {
            throw new InternalServerErrorException('Error deleting task.');
        }
    }
}
