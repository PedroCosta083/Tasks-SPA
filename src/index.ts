import { Tag, TagsProps } from "./domain/tags/tags.entity";
import TagsRepository from "./repository/tags.repository";
import TaskRepository from "./repository/task.repository";
import CreateTagUseCase from "./usecases/tags/create.tag.usecase";
import { FindAllTagsUseCase } from "./usecases/tags/findAll.tag.usecase";
import { FindTagByIdUseCase } from "./usecases/tags/findById.tag.usecase";
import CreateTaskUseCase from "./usecases/task/create.task.usecase";


// Criar uma instância do repositório de tarefas
const taskRepository = new TaskRepository();
const tagsRepository = new TagsRepository();
// Criar uma instância do caso de uso, passando o repositório como dependência
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const createTagUseCase = new CreateTagUseCase(tagsRepository);
const findAllTagsUseCase = new FindAllTagsUseCase(tagsRepository);
const findTagsByIdUseCase = new FindTagByIdUseCase(tagsRepository);
findAllTagsUseCase.execute()
    .then((tags) => {
        if (tags) {
            console.log("Tags encontradas:");
            console.log(tags);
            // Faça o que precisar com as tags aqui
        } else {
            console.log("Nenhuma tag encontrada.");
        }
    })
    .catch((error) => {
        console.error("Erro ao buscar as tags:", error);
    });

findTagsByIdUseCase.execute("a93d4b91-fa52-49ad-9f64-c18a568f59f7").then((tag) => {
    if (tag) {
        console.log("Tags encontradas pelo id:");
        console.log(tag);
    }
})
