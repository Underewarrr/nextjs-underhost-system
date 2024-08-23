import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    // Obter o id da query e converter para número inteiro
    const id = parseInt(req.query.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    try {
      // Excluir o pedido baseado no ID
      const deletedOrder = await prisma.vPSRequest.delete({
        where: { id: id }
      });

      return res.status(200).json(deletedOrder);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao excluir o pedido." });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}
