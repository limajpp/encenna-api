import Usuario from "../models/usuario.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error(
    "FATAL ERROR: JWT_SECRET não está definido nas variáveis de ambiente."
  );
  process.exit(1);
}

export default class UsuarioController {
  static criarUsuario = async (req, res) => {
    try {
      const { nome, email, senha, telefone, cpf, tipo, fotoPerfil } = req.body;

      if (!nome || !senha || !telefone || !cpf || !tipo) {
        return res
          .status(400)
          .json({
            erro: "Campos obrigatórios ausentes: nome, senha, telefone, cpf, tipo.",
          });
      }

      const dadosNovoUsuario = {
        nome,
        email,
        senha,
        telefone,
        cpf,
        tipo,
        fotoPerfil: fotoPerfil || "",
      };

      if (tipo === "Usuário") {
        dadosNovoUsuario.frequencia = 100;
      }

      const novoUsuario = new Usuario(dadosNovoUsuario);
      await novoUsuario.save();

      const usuarioParaRetorno = novoUsuario.toObject();
      delete usuarioParaRetorno.senha;

      res.status(201).json(usuarioParaRetorno);
      console.log("Usuário criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar novo usuário:", error);
      if (error.name === "ValidationError") {
        const errosDeValidacao = Object.values(error.errors).map(
          (err) => err.message
        );
        return res
          .status(400)
          .json({ erro: "Erro de validação.", detalhes: errosDeValidacao });
      }
      if (error.code === 11000) {
        const campoDuplicado = Object.keys(error.keyValue)[0];
        return res
          .status(409)
          .json({
            erro: `O campo '${campoDuplicado}' com valor '${error.keyValue[campoDuplicado]}' já existe.`,
          });
      }
      res.status(500).json({
        erro: "Ocorreu um erro inesperado ao tentar criar o usuário.",
        detalhes: error.message,
      });
    }
  };

  static listarUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuario.find().select("-senha");

      res.status(200).json(usuarios);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res
        .status(500)
        .json({ erro: "Erro interno ao tentar listar os usuários." });
    }
  };

  static atualizarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const dadosAtualizacao = req.body;

      delete dadosAtualizacao.cpf;
      delete dadosAtualizacao.tipo;

      if (Object.keys(dadosAtualizacao).length === 0) {
        return res
          .status(400)
          .json({ erro: "Nenhum dado fornecido para atualização." });
      }

      if (dadosAtualizacao.senha) {
        const salt = await bcrypt.genSalt(10);
        dadosAtualizacao.senha = await bcrypt.hash(
          dadosAtualizacao.senha,
          salt
        );
      }

      const usuarioAtualizado = await Usuario.findByIdAndUpdate(
        id,
        { $set: dadosAtualizacao },
        { new: true, runValidators: true }
      ).select("-senha");

      if (!usuarioAtualizado) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      res.status(200).json(usuarioAtualizado);
      console.log("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      if (error.name === "ValidationError") {
        const errosDeValidacao = Object.values(error.errors).map(
          (err) => err.message
        );
        return res
          .status(400)
          .json({ erro: "Erro de validação.", detalhes: errosDeValidacao });
      }
      if (error.name === "CastError" && error.path === "_id") {
        return res.status(400).json({ erro: "ID do usuário inválido." });
      }
      if (error.code === 11000) {
        const campoDuplicado = Object.keys(error.keyValue)[0];
        return res
          .status(409)
          .json({
            erro: `O campo '${campoDuplicado}' com valor '${error.keyValue[campoDuplicado]}' já está em uso.`,
          });
      }
      res
        .status(500)
        .json({ erro: "Erro interno ao tentar atualizar o usuário." });
    }
  };

  static deletarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioDeletado = await Usuario.findByIdAndDelete(id);

      if (!usuarioDeletado) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      console.log("Usuário excluído com sucesso!");
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      if (error.name === "CastError" && error.path === "_id") {
        return res.status(400).json({ erro: "ID do usuário inválido." });
      }
      res
        .status(500)
        .json({ erro: "Erro interno ao tentar excluir o usuário." });
    }
  };

  static loginUsuario = async (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res
          .status(400)
          .json({ erro: "Email e senha são obrigatórios." });
      }

      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(401).json({ erro: "Credenciais inválidas." });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ erro: "Credenciais inválidas." });
      }

      const token = jwt.sign(
        { id: usuario._id, tipo: usuario.tipo, email: usuario.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res
        .status(200)
        .json({
          token,
          usuario: {
            id: usuario._id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo,
            fotoPerfil: usuario.fotoPerfil,
          },
        });
    } catch (error) {
      console.error("Erro no login:", error);
      res
        .status(500)
        .json({ erro: "Erro interno no servidor durante o login." });
    }
  };
}
