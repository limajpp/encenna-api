import Usuario from "../models/usuario.js";

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senhaHash, telefone, cpf, tipo, fotoPerfil } =
      req.body;
    const novoUsuario = new Usuario({
      nome,
      email,
      senhaHash,
      telefone,
      cpf,
      tipo,
      fotoPerfil,
    });
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
    console.log("Usuário criado com sucesso!");
  } catch (error) {
    res
      .status(404)
      .json({ erro: "Algo deu errado durante a criação do novo usuário!" });
    console.error("Algo deu errado ao tentar criar um novo usuário...", error);
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    if (!usuarios)
      return res.status(404).json({ erro: "A lista de usuário está vazia." });

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Algo deu errado ao tentar listar os usuários...", error);
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, senhaHash, telefone, cpf, tipo, fotoPerfil } =
      req.body;
    const usuarioAntigo = await Usuario.findByIdAndUpdate(req.params.id, {
      nome,
      email,
      senhaHash,
      telefone,
      cpf,
      tipo,
      fotoPerfil,
    });
    res.json(usuarioAntigo);
    console.log("Usuário atualizado com sucesso!");
  } catch (error) {
    console.error("Algo deu errado ao tentar atualizar o usuário", error);
  }
};

export const deletarUsuario = async (req, res) => {
  try {
    const oldUser = await Usuario.findByIdAndDelete(req.params.id);
    if (!oldUser) res.status(404).json({ erro: "O usuário não existe..." });
    console.log("Usuário excluído com sucesso!");
    res.status(204).end();
  } catch (error) {
    console.error("Algo deu errado ao tentar excluir o usuário...", error);
  }
};
