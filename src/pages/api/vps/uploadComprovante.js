import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // Importante: desativar o bodyParser para permitir o processamento de arquivos
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const form = formidable({ 
    keepExtensions: true, 
    uploadDir: "./uploads", // Diretório onde os arquivos serão armazenados
    allowEmptyFiles: false,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Erro ao processar o formulário:", err);
      return res.status(500).json({ message: "Erro ao processar o upload.", error: err.message });
    }

    const { orderId } = fields;
    const file = files.comprovante;

    if (!file) {
      console.error("Arquivo não encontrado ou nome do campo incorreto.");
      return res.status(400).json({ message: "Arquivo não encontrado. Verifique se o campo está nomeado como 'comprovante'." });
    }

    try {
      const fileBuffer = fs.readFileSync(file.filepath); // Aqui usamos `filepath` para acessar o caminho correto do arquivo

      const updatedOrder = await prisma.vPSRequest.update({
        where: { id: parseInt(orderId) },
        data: { comprovante: fileBuffer },
      });

      return res.status(200).json(updatedOrder);
    } catch (dbError) {
      console.error("Erro ao salvar o comprovante no banco de dados:", dbError);
      return res.status(500).json({ message: "Erro ao salvar o comprovante no banco de dados.", error: dbError.message });
    }
  });
}
