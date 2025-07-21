import express from "express";

const app = express();
app.use(express.json())

const livros = [
    {
        id: 1,
        titulo: "O senhor dos Anéis"
    },{
        id: 2,
        titulo: "O Hobbit"
    }
];

function buscarlivro(id) {
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    })
}


app.get("/", (req, res) => {
    res.status(200).send("curso de Node.js")
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros)
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).send("Livro cadastrado com sucesso")
});

app.get("/livros/:id", (req, res) => {
    const index = buscarlivro(req.params.id) //req.params.id <= recupera o id da url como um parametro da request
    res.status(200).json(livros[index]);
});

app.put("/livros/:id", (req, res) => {
    const index = buscarlivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros[index]);
});

app.delete("/livros/:id", (req, res) => {
    const index = buscarlivro(req.params.id);
    livros.splice(index, 1);
    res.status(200).send("Livro removido com sucesso.");
});

export default app