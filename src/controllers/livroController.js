import livro from "../model/Livro.js";
import { autor } from "../model/Autor.js"

class LivroController {
    //static permite acessar metodos de class sem necessidade de instanciar a classe
    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({});
            //const listaLivros = await livro.find({}).populate("autor").exec(); // <= caso esteja usando o referencing de autor em livro necessario popular os autores para trazer suas informacoes no banco de dados NoSQL
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisicao`})
        }
    }

    static async cadastrarLivro(req, res) {
        const novoLivro = req.body 
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({message: "Criado com sucesso", livro: livroCriado})
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao cadastrar livro` })
        }

    }

    static async buscarLivroPorId(req, res) {
        try{
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisicao`})
        }
    }

    static async atualizarLivro(req, res) {
        try{
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "livro atualizado"})
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisicao`})
        }
    }
    
    static async deletarPorId(req, res) {
        try{
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({message: "livro excluido com sucesso"});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisicao`});
        }
    }

    static async listarLivrosPorEditora(req, res) {
        const pEditora = req.query.editora;
        try{
            const livrosPorEditora = await livro.find({editora: pEditora});
            res.status(200).json(livrosPorEditora);
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisicao`});
        }
    }


};

export default LivroController;
