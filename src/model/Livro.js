import mongoose, { mongo } from "mongoose";
import { autorSchema } from "./Autor.js";

const LivroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required:true },
    editora: { type: mongoose.Schema.Types.String},
    preco: { type: Number },
    paginas: { type: Number },
    autor: autorSchema
    //autor: {type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: true} 
}, { versionKey: false } );

const livro = mongoose.model("livros", LivroSchema);

export default livro;