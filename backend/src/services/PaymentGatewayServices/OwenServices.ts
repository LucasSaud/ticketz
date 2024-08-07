/*

   DO NOT REMOVE / NÃO REMOVER

   VERSÃO EM PORTUGUÊS MAIS ABAIXO

   
   BASIC LICENSE INFORMATION:

   Author: Claudemir Todo Bom
   Email: claudemir@todobom.com
   
   Licensed under the AGPLv3 as stated on LICENSE.md file
   
   Any work that uses code from this file is obligated to 
   give access to its source code to all of its users (not only
   the system's owner running it)
   
   EXCLUSIVE LICENSE to use on closed source derived work can be
   purchased from the author and put at the root of the source
   code tree as proof-of-purchase.



   INFORMAÇÕES BÁSICAS DE LICENÇA

   Autor: Claudemir Todo Bom
   Email: claudemir@todobom.com

   Licenciado sob a licença AGPLv3 conforme arquivo LICENSE.md
    
   Qualquer sistema que inclua este código deve ter o seu código
   fonte fornecido a todos os usuários do sistema (não apenas ao
   proprietário da infraestrutura que o executa)
   
   LICENÇA EXCLUSIVA para uso em produto derivado em código fechado
   pode ser adquirida com o autor e colocada na raiz do projeto
   como prova de compra. 
   
 */

import { Request, Response } from "express";
import axios from "axios";
import GetSuperSettingService from "../SettingServices/GetSuperSettingService";
import { logger } from "../../utils/logger";
import { getIO } from "../../libs/socket";
import Invoices from "../../models/Invoices";
import Company from "../../models/Company";
import AppError from "../../errors/AppError";

const owenBaseURL = "https://pix.owenbrasil.com.br";

export const owenWebhook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { data } = req.body;
  if (data.status === "APPROVED") {
    const { qrcodeId } = data;
    const invoice = await Invoices.findOne({
      where: {
        txId: qrcodeId,
        status: "open"
      },
      include: { model: Company, as: "company" }
    });

    if (!invoice || data.valor < invoice.value) {
      return res.json({ ok: true });
    }

    const expiresAt = new Date(invoice.company.dueDate);
    expiresAt.setDate(expiresAt.getDate() + 30);
    const date = expiresAt.toISOString().split("T")[0];

    await invoice.company.update({
      dueDate: date
    });
    await invoice.update({
      status: "paid"
    });
    await invoice.company.reload();
    const io = getIO();

    io.to(`company-${invoice.companyId}-mainchannel`)
      .to("super")
      .emit(`company-${invoice.companyId}-payment`, {
        action: "CONCLUIDA",
        company: invoice.company,
        invoiceId: invoice.id
      });
  }
  return res.json({ ok: true });
};

export const owenCreateSubscription = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { price, invoiceId } = req.body;

  const config = {
    params: {
      valor: price.toFixed([2]),
      minutos: 5,
      mensagem: `#Fatura:${invoiceId}`,
      user: await GetSuperSettingService({ key: "_owenCnpj" }),
      password: await GetSuperSettingService({ key: "_owenToken" }),
      secretkey: await GetSuperSettingService({ key: "_owenSecretKey" })
    }
  };

  try {
    const invoice = await Invoices.findByPk(invoiceId);
    if (!invoice) {
      throw new Error("Invoice not found");
    }
    const qrResult = await axios.get(
      `${owenBaseURL}/api/v1/qrdinamico`,
      config
    );
    invoice.update({
      txId: qrResult.data.data.qrcodeId,
      payGw: "owen",
      payGwData: JSON.stringify(qrResult.data.data)
    });
    return res.json({
      qrcode: { qrcode: qrResult.data.data.qrcode },
      valor: { original: price }
    });
  } catch (error) {
    logger.error({ error }, "owenCreateSubscription error");
    throw new AppError(
      "Problema encontrado, entre em contato com o suporte!",
      400
    );
  }
};
