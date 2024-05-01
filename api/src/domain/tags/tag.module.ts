import { Module } from "@nestjs/common";
import { TagController } from "src/controllers/tag/tag.controller";
import TagsRepository from "src/repository/tagRepositoy/tags.repository";
import TaskRepository from "src/repository/taskRepository/task.repository";
import CreateTagUseCase from "src/usecases/tags/create.tag.usecase";
import DeleteTagUseCase from "src/usecases/tags/delete.tag.usecase";
import { FindAllTagsUseCase } from "src/usecases/tags/findAll.tag.usecase";
import { FindTagByIdUseCase } from "src/usecases/tags/findById.tag.usecase";
import FindTagByNameUseCase from "src/usecases/tags/findByName.tag.usecase";
import UpdateTagUseCase from "src/usecases/tags/update.tag.usecase";

@Module({
    imports: [],
    controllers: [TagController],
    providers: [CreateTagUseCase, UpdateTagUseCase, DeleteTagUseCase, FindTagByIdUseCase, FindTagByNameUseCase, FindAllTagsUseCase, TaskRepository, TagsRepository]
})
export class TagModule { }
