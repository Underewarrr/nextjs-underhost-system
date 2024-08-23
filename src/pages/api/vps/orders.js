import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Buscar os últimos pedidos de VPS no banco de dados
      const vpsOrders = await prisma.vPSRequest.findMany({
        orderBy: {
          createdAt: 'desc', // Ordenar pelos pedidos mais recentes
        },
        include: {
          user: true, // Inclui informações do usuário associado ao pedido, caso necessário
        },
      });

      // Adicionar o código QR e initPoint para pedidos não pagos
      const ordersWithQRCode = await Promise.all(
        vpsOrders.map(async (order) => {
          if (!order.isPaid) {
            const initPoint = await generateInitPoint(order.preferenceId);
            console.log(`Generated initPoint for order ${order.id}: ${initPoint}`); // Log do initPoint
            return { ...order, initPoint };
          }
          return order;
        })
      );

      return res.status(200).json(ordersWithQRCode);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}

// Função para gerar o initPoint usando o preferenceId do Mercado Pago
async function generateInitPoint(preferenceId) {
  return `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}`;
}
