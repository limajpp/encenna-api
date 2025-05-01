import Biblioteca from "../models/biblioteca.js";

export const criarMaterial = async (req, res) => {
  try {
    const { titulo, autor, arquivo, tipo } = req.body;

    const novoMaterial = new Biblioteca({ titulo, autor, arquivo, tipo });
    await novoMaterial.save();

    res.status(201).json(novoMaterial);
    console.log("Material criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar material:", error);
    res.status(500).json({ erro: "Erro ao criar material." });
  }
};

export const listarMateriais = async (req, res) => {
  try {
    const materiais = await Biblioteca.find();
    res.status(200).json(materiais);
  } catch (error) {
    console.error("Erro ao listar materiais:", error);
    res.status(500).json({ erro: "Erro ao listar materiais." });
  }
};

export const atualizarMaterial = async (req, res) => {
  try {
    const { titulo, autor, arquivo, tipo } = req.body;

    const materialAtualizado = await Biblioteca.findByIdAndUpdate(
      req.params.id,
      { titulo, autor, arquivo, tipo },
      { new: true }
    );

    res.status(200).json(materialAtualizado);
    console.log("Material atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar material:", error);
    res.status(500).json({ erro: "Erro ao atualizar material." });
  }
};

export const deletarMaterial = async (req, res) => {
  try {
    await Biblioteca.findByIdAndDelete(req.params.id);
    res.status(204).end();
    console.log("Material deletado com sucesso!");
  } catch (error) {
    console.error("Erro ao deletar material:", error);
    res.status(500).json({ erro: "Erro ao deletar material." });
  }
};
