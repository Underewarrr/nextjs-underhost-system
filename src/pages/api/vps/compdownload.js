import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { orderId } = req.query;

  if (req.method === "GET") {
    try {
      const order = await prisma.vPSRequest.findUnique({
        where: { id: parseInt(orderId) },
      });

      if (!order || !order.comprovante) {
        return res.status(404).json({ message: "Comprovante não encontrado." });
      }

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=comprovante_${orderId}.pdf`);
      return res.send(order.comprovante);
    } catch (error) {
      console.error("Erro ao recuperar o comprovante:", error);
      return res.status(500).json({ message: "Erro ao recuperar o comprovante." });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}
