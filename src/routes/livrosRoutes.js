import express from "express";
import LivroController from "../controllers/livroController.js";


const routes = express.Router();

//rota de maior complexidade tem prioridade de ficar acima a rotas de menor complexidade
routes.get("/livros", LivroController.listarLivros);
routes.get("/livros/buscar", LivroController.listarLivrosPorEditora);
routes.get("/livros/:id", LivroController.buscarLivroPorId);

routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.deletarPorId);


export default routes;