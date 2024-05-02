# Rota Padrão
`http://localhost:3333/`

# TaskController

## Listar todas as tarefas

- **Endpoint:** 
    `GET /task/tasks`

- **Descrição:** 
    Retorna todas as tarefas cadastradas.

## Buscar uma tarefa por ID

- **Endpoint:** 
    `GET /task/:id`

- **Parâmetros:** 
    - `id`: ID da tarefa a ser buscada.

- **Descrição:** 
    Retorna os detalhes de uma tarefa específica com base no ID fornecido.

## Buscar tarefas por título

- **Endpoint:** 
    `GET /task/title/search?title={title}`

- **Parâmetros de consulta:** 
    - `title`: Título da tarefa a ser buscada.

- **Descrição:** 
    Retorna todas as tarefas que correspondem ao título fornecido.

## Buscar tarefas por tag

- **Endpoint:** 
    `GET /task/tag/:tagId`

- **Parâmetros:** 
    - `tagId`: ID da tag pela qual as tarefas serão filtradas.

- **Descrição:** 
    Retorna todas as tarefas associadas a uma determinada tag.

## Criar uma nova tarefa

- **Endpoint:** 
    `POST /task/create`

- **Corpo da solicitação:** 
    ```json
    {
        "title": "string",
        "description": "string",
        "dateTime": "string",
        "duration": "string",
        "tags": ["string"]
    }
    ```

- **Descrição:** 
    Cria uma nova tarefa com base nos detalhes fornecidos no corpo da solicitação.

## Atualizar uma tarefa existente

- **Endpoint:** 
    `PUT /task/update/:id`

- **Parâmetros:** 
    - `id`: ID da tarefa a ser atualizada.

- **Corpo da solicitação:** 
    ```json
    {
        "title": "string",
        "description": "string",
        "dateTime": "string",
        "duration": "string",
        "tags": ["string"]
    }
    ```

- **Descrição:** 
    Atualiza uma tarefa existente com base no ID fornecido e nos detalhes fornecidos no corpo da solicitação.

## Excluir uma tarefa

- **Endpoint:** 
    `DELETE /task/:id`

- **Parâmetros:** 
    - `id`: ID da tarefa a ser excluída.

- **Descrição:** 
    Exclui uma tarefa específica com base no ID fornecido.

# TagController

## Listar todas as tags

- **Endpoint:** 
    `GET /tag/tags`

- **Descrição:** 
    Retorna todas as tags cadastradas.

## Buscar uma tag por ID

- **Endpoint:** 
    `GET /tag/:id`

- **Parâmetros:** 
    - `id`: ID da tag a ser buscada.

- **Descrição:** 
    Retorna os detalhes de uma tag específica com base no ID fornecido.

## Buscar tags por nome

- **Endpoint:** 
    `GET /tag/name/search?name={name}`

- **Parâmetros de consulta:** 
    - `name`: Nome da tag a ser buscada.

- **Descrição:** 
    Retorna todas as tags que correspondem ao nome fornecido.

## Criar uma nova tag

- **Endpoint:** 
    `POST /tag/create`

- **Corpo da solicitação:** 
    ```json
    {
        "name": "string"
    }
    ```

- **Descrição:** 
    Cria uma nova tag com base nos detalhes fornecidos no corpo da solicitação.

## Atualizar uma tag existente

- **Endpoint:** 
    `PUT /tag/update/:id`

- **Parâmetros:** 
    - `id`: ID da tag a ser atualizada.

- **Corpo da solicitação:** 
    ```json
    {
        "name": "string"
    }
    ```

- **Descrição:** 
    Atualiza uma tag existente com base no ID fornecido e nos detalhes fornecidos no corpo da solicitação.

## Excluir uma tag

- **Endpoint:** 
    `DELETE /tag/:id`

- **Parâmetros:** 
    - `id`: ID da tag a ser excluída.

- **Descrição:** 
    Exclui uma tag específica com base no ID fornecido.
