const { response } = require("express");
const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const projects = [];

/**
 * Query Params: Vamos usar principalmente para filtros e paginação
 * Route Params: Identificar recursos na hora de atualizar ou deletar
 * Request Body: Resto do conteúdo na hora de criar ou editar um recurso
 */

app.post("/projects", (req, res) => {
    const { title, owner } = req.body;

    const project = { id: uuid(), title, owner };

    projects.push(project); // esse push vai jogar a criação do nosso projeto para o nosso array

    return res.json(project); // sempre retornar o projeto recém criado e nunca exibir a linha completa
});

app.get("/projects", (req, res) => {
    return res.json(projects);
});

app.put("/projects/:id", (req, res) => {
    const { id } = req.params; // aqui pegamos nosso ID
    const { title, owner } = req.body; // retornamos uma nova informação

    // aqui usamos o findIndex para percorrer todo o array atrás do id
    // findIndex vai percorrer todos os projetos e toda vez que ele percorrer na variável project
    // caso ela seja satisfeita e retornar true, ela vai retornar o id que está passando (project => project.id)
    const projectIndex = projects.findIndex((project) => project.id === id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: "Projeto não foi encontrado" });
    }

    // agora que tem um índice, vai criar uma nova informação do projeto
    const project = {
        id,
        title,
        owner,
    };

    projects[projectIndex] = project;

    return res.json(project);
});

app.delete("/projects/:id", (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex((project) => project.id === id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: "Projeto não foi encontrado" });
    }

    projects.splice(projectIndex, 1);

    return res.status(204).send();
});

app.listen(3000);
