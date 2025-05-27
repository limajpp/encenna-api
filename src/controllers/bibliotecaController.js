import Biblioteca from "../models/biblioteca.js";

export default class BibliotecaController {
  static criarMaterial = async (req, res) => {
    try {
      const { titulo, tipo } = req.body;

      if (!titulo || !tipo) {
        return res
          .status(400)
          .json({ erro: "Título e tipo são obrigatórios." });
      }

      let arquivo = null;
      let autor = null;

      if (tipo === "Livro" && titulo) {
        const googleApiUrl = `https://www.googleapis.com/books/v1/volumes?q=title:${encodeURIComponent(
          titulo
        )}`;

        const response = await fetch(googleApiUrl);

        if (response.ok) {
          const googleData = await response.json();
          if (googleData.items && googleData.items.length > 0) {
            const livroEncontrado = googleData.items.find(
              (item) =>
                item.volumeInfo &&
                item.volumeInfo.title &&
                item.volumeInfo.title
                  .toLowerCase()
                  .includes(titulo.toLowerCase()) &&
                item.volumeInfo.imageLinks &&
                item.volumeInfo.imageLinks.thumbnail &&
                item.volumeInfo.authors &&
                item.volumeInfo.authors.length > 0
            );

            if (livroEncontrado) {
              const bookData = livroEncontrado.volumeInfo;
              arquivo = bookData.imageLinks.thumbnail;
              autor = bookData.authors.join(", ");
            } else {
              console.log(
                "Nenhum livro correspondente com todas as informações necessárias (título, imagem, autor) foi encontrado na API do Google."
              );
              res.status(400).json({
                erro: "Não foi encontrando nenhum livro correspondente com todas as informações necessárias.",
              });
            }
          } else {
            console.log(
              "Nenhum item retornado pela API do Google para o título fornecido."
            );
            res.status(400).json({
              erro: "Não foi encontrando nenhum item correspondente ao título.",
            });
          }
        } else {
          console.warn(
            `A API do Google Books retornou um status não OK: ${response.status} - ${response.statusText}. Continuando sem dados da API.`
          );
          res.status(400).json({
            erro: "Erro na API do Google Books.",
          });
        }
      }

      const dadosNovoMaterial = { titulo, tipo };
      if (autor) dadosNovoMaterial.autor = autor;
      if (arquivo) dadosNovoMaterial.arquivo = arquivo;

      const novoMaterial = new Biblioteca(dadosNovoMaterial);
      await novoMaterial.save();

      res.status(201).json(novoMaterial);
      console.log("Material criado com sucesso!");
    } catch (error) {
      console.error("Erro detalhado ao criar material:", error);
      if (error.name === "ValidationError") {
        res.status(400).json({
          erro: "Erro de validação ao criar material.",
          detalhes: error.errors,
        });
      } else if (
        error.message.includes("fetch") ||
        error.message.includes("network") ||
        (error.cause &&
          typeof error.cause.code === "string" &&
          error.cause.code.startsWith("E"))
      ) {
        res.status(503).json({
          erro: "Erro de comunicação ao tentar buscar dados externos do livro.",
        });
      } else {
        res
          .status(500)
          .json({ erro: "Erro interno do servidor ao criar material." });
      }
    }
  };

  static listarMateriais = async (req, res) => {
    try {
      const materiais = await Biblioteca.find();
      res.status(200).json(materiais);
    } catch (error) {
      console.error("Erro ao listar materiais:", error);
      res.status(500).json({ erro: "Erro interno ao listar materiais." });
    }
  };

  static atualizarMaterial = async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, tipo } = req.body;

      if (!titulo && !tipo) {
        return res.status(400).json({
          erro: "Pelo menos título ou tipo devem ser fornecidos para atualização.",
        });
      }

      let arquivoParaAtualizar = null;
      let autorParaAtualizar = null;
      const dadosParaAtualizar = {};

      if (titulo) {
        dadosParaAtualizar.titulo = titulo;
      }
      if (tipo) {
        dadosParaAtualizar.tipo = tipo;
      }

      const tituloParaBusca =
        titulo ||
        (await Biblioteca.findById(id).select("titulo").lean())?.titulo;
      const tipoConsiderado =
        tipo || (await Biblioteca.findById(id).select("tipo").lean())?.tipo;

      if (tipoConsiderado === "Livro" && tituloParaBusca) {
        const googleApiUrl = `https://www.googleapis.com/books/v1/volumes?q=title:${encodeURIComponent(
          tituloParaBusca
        )}`;

        const response = await fetch(googleApiUrl);

        if (response.ok) {
          const googleData = await response.json();
          if (googleData.items && googleData.items.length > 0) {
            const livroEncontrado = googleData.items.find(
              (item) =>
                item.volumeInfo &&
                item.volumeInfo.title &&
                item.volumeInfo.title
                  .toLowerCase()
                  .includes(tituloParaBusca.toLowerCase()) &&
                item.volumeInfo.imageLinks &&
                item.volumeInfo.imageLinks.thumbnail &&
                item.volumeInfo.authors &&
                item.volumeInfo.authors.length > 0
            );

            if (livroEncontrado) {
              const bookData = livroEncontrado.volumeInfo;
              arquivoParaAtualizar = bookData.imageLinks.thumbnail;
              autorParaAtualizar = bookData.authors.join(", ");
            } else {
              console.log(
                "Nenhum livro correspondente com todas as infos na API (atualizar). Autor/Arquivo serão nulos."
              );
              res.status(400).json({
                erro: "Não foi encontrando nenhum livro correspondente com todas as informações necessárias.",
              });
            }
          } else {
            console.log(
              "Nenhum item retornado pela API do Google (atualizar). Autor/Arquivo serão nulos."
            );
            res.status(400).json({
              erro: "Não foi encontrando nenhum livro.",
            });
          }
        } else {
          console.warn(
            `A API do Google Books (atualizar) retornou um status não OK: ${response.status} - ${response.statusText}. Autor/Arquivo serão nulos.`
          );
          res.status(400).json({
            erro: "Erro na API do Google Books",
          });
        }
        dadosParaAtualizar.autor = autorParaAtualizar;
        dadosParaAtualizar.arquivo = arquivoParaAtualizar;
      } else if (tipoConsiderado !== "Livro") {
        dadosParaAtualizar.autor = null;
        dadosParaAtualizar.arquivo = null;
      }

      const materialAtualizado = await Biblioteca.findByIdAndUpdate(
        id,
        { $set: dadosParaAtualizar },
        { new: true, runValidators: true }
      );

      if (!materialAtualizado) {
        return res.status(404).json({ erro: "Material não encontrado." });
      }

      res.status(200).json(materialAtualizado);
      console.log("Material atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar material:", error);
      if (error.name === "ValidationError") {
        res.status(400).json({
          erro: "Erro de validação ao atualizar material.",
          detalhes: error.errors,
        });
      } else if (error.name === "CastError" && error.path === "_id") {
        res.status(400).json({ erro: "ID do material inválido." });
      } else if (
        error.message.includes("fetch") ||
        error.message.includes("network") ||
        (error.cause &&
          typeof error.cause.code === "string" &&
          error.cause.code.startsWith("E"))
      ) {
        res.status(503).json({
          erro: "Erro de comunicação ao tentar buscar dados externos do livro durante a atualização.",
        });
      } else {
        res.status(500).json({ erro: "Erro interno ao atualizar material." });
      }
    }
  };

  static deletarMaterial = async (req, res) => {
    try {
      const { id } = req.params;
      const materialDeletado = await Biblioteca.findByIdAndDelete(id);

      if (!materialDeletado) {
        return res.status(404).json({ erro: "Material não encontrado." });
      }

      console.log("Material deletado com sucesso!");
      res.status(204).end();
    } catch (error) {
      console.error("Erro ao deletar material:", error);
      if (error.name === "CastError" && error.path === "_id") {
        res.status(400).json({ erro: "ID do material inválido." });
      } else {
        res.status(500).json({ erro: "Erro interno ao deletar material." });
      }
    }
  };
}
