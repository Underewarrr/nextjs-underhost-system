import { PrismaClient } from "@prisma/client";
import { MercadoPagoConfig, Preference } from "mercadopago";

const prisma = new PrismaClient();

// Configurando o SDK do Mercado Pago com o Access Token
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || "APP_USR-8098170998200271-082219-1eb68b18a4c57846ae9354db505db2c9-290098653", // Use uma variável de ambiente para o access token
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { vpsCores, vpsMemory, vpsStorage, isSSD, additionalIPs, duration, totalPrice, userId } = req.body;

    try {
      // Criando a preferência de pagamento
      const preference = new Preference(client);
      const response = await preference.create({
        body: {
          items: [
            {
              title: "Plano VPS Personalizado",
              quantity: 1,
              currency_id: "BRL",
              unit_price: totalPrice,
            },
          ],
          back_urls: {
            success: "https://yourdomain.com/success",
            failure: "https://yourdomain.com/failure",
            pending: "https://yourdomain.com/pending",
          },
          auto_return: "approved",
        },
      });

      // Log para verificar a resposta completa
      console.log("Resposta da API do Mercado Pago:", response);

      // Acessando o ID da preferência e o init_point retornado pelo Mercado Pago
      const preferenceId = response.id;
      const initPoint = response.init_point;

      if (!preferenceId || !initPoint) {
        throw new Error("ID da preferência ou init_point não encontrado na resposta.");
      }

      // Registrando o pedido na base de dados
      const vpsRequest = await prisma.vPSRequest.create({
        data: {
          vpsCores,
          vpsMemory,
          vpsStorage,
          isSSD,
          additionalIPs,
          duration,
          totalPrice,
          userId,
          paymentStatus: "PENDING",
          preferenceId, // Salve o ID da preferência para referência futura
        },
      });

      return res.status(201).json({ vpsRequest, preferenceId, initPoint });
    } catch (error) {
      console.error("Erro ao criar a preferência de pagamento:", error.message);
      return res.status(500).json({ message: "Erro interno do servidor: " + error.message });
    }
  } else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}
