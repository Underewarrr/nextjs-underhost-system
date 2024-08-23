// pages/api/vps/deleteUnpaid.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      // Deletar pedidos que ainda não foram pagos
      const deletedOrders = await prisma.vPSRequest.deleteMany({
        where: {
          status: 'unpaid',
        },
      });

      return res.status(200).json({ message: `${deletedOrders.count} pedidos não pagos deletados com sucesso.` });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}
