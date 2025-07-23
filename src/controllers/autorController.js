import { autor } from "../model/Autor.js"

class autorController {
    //static permite acessar metodos de class sem necessidade de instanciar a classe
    static async listarAutores(req, res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisicao`})
        }
    }

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({message: "Criado com sucesso", autor: novoAutor})
        } catch (erro) {
            res.status(500).json({message: `${erro.message} - falha ao cadastrar autor` })
        }

    }

    static async buscarAutorPorId(req, res) {
        try{
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisicao`})
        }
    }

    static async atualizarAutor(req, res) {
        try{
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({message: "Autor atualizado"})
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisicao`})
        }
    }
    
    static async deletarPorId(req, res) {
        try{
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            res.status(200).json({message: "autor excluido com sucesso"});
        }catch(erro){
            res.status(500).json({message: `${erro.message} - falha na requisicao`});
        }
    }


};

export default autorController;
