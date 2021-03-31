const { response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

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

    const project = { id: uuidv4(), title, owner };

    projects.push(project); // esse push vai jogar a criação do nosso projeto para o nosso array

    return res.json(project); // sempre retornar o projeto recém criado e nunca exibir a linha completa
});

app.get("/projects", (req, res) => {
    return res.json(projects);
});

app.put("/projects/:id", (req, res) => {
    const params = req.params;

    console.log(params);

    return res.json([
        "Projeto 50",
        "Projeto 2",
        "Projeto 3",
        "Projeto 4",
        "Projeto 5",
    ]);
});

app.delete("/projects/:id", (req, res) => {
    return res.json(["Projeto 50", "Projeto 2"]);
});

app.listen(3000);
