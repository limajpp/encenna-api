import Usuario from "../models/usuario.js";

export default class UsuarioController {
  static criarUsuario = async (req, res) => {
    try {
      const { nome, email, senha, telefone, cpf, tipo, fotoPerfil } = req.body;
      const novoUsuario = new Usuario({
        nome,
        email,
        senha,
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
        .json({
          erro: `Algo deu errado durante a criação do novo usuário, ${error}`,
        });
      console.error(
        "Algo deu errado ao tentar criar um novo usuário...",
        error
      );
    }
  };

  static listarUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      if (!usuarios)
        return res.status(404).json({ erro: "A lista de usuário está vazia." });

      res.status(200).json(usuarios);
    } catch (error) {
      console.error("Algo deu errado ao tentar listar os usuários...", error);
    }
  };

  static atualizarUsuario = async (req, res) => {
    try {
      const { nome, email, senha, telefone, cpf, tipo, fotoPerfil } = req.body;
      const usuarioAntigo = await Usuario.findByIdAndUpdate(req.params.id, {
        nome,
        email,
        senha,
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

  static deletarUsuario = async (req, res) => {
    try {
      const oldUser = await Usuario.findByIdAndDelete(req.params.id);
      if (!oldUser) res.status(404).json({ erro: "O usuário não existe..." });
      console.log("Usuário excluído com sucesso!");
      res.status(204).end();
    } catch (error) {
      console.error("Algo deu errado ao tentar excluir o usuário...", error);
    }
  };

  static loginUsuario = async (req, res) => {
    const { email, senha } = req.body;
    const user = await Usuario.findOne({ email });
    if (!user) return res.status(400).json({ erro: "Usuário não encontrado" });

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) return res.status(401).json({ erro: "Senha incorreta" });
    res.json({ mensagem: "Login realizado com sucesso", user });
  };
}
