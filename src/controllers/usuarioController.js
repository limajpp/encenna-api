import Usuario from "../models/usuario.js";

const criarUsuario = async (req, res) => {
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
    console.error("Algo deu errado ao tentar criar um novo usuário...", error);
  }
};

export default criarUsuario;
