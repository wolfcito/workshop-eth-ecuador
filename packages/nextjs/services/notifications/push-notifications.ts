import { PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import * as dotenv from "dotenv";
import { getSigner } from "~~/lib/notifications.lib";

dotenv.config();

export const sendPushNotifications = async (blockExplorerInternalTxURL: string) => {
  const signer = getSigner(process.env.PUSH_NOTIFICATIONS_SIGNER as string);

  const sprayChannel = await PushAPI.initialize(signer, { env: ENV.STAGING });

  const { items } = await fetch(blockExplorerInternalTxURL).then(res => res.json());

  const senderTitle = `Envio exitoso !`;
  const senderBody = `${items[0].from.hash} te ha enviado dinero! 💰 `;

  sprayChannel.channel.send([items[0].to.hash], {
    notification: {
      title: senderTitle,
      body: senderBody,
    },
    payload: {
      cta: "",
      title: senderTitle,
      body: senderBody,
    },
  });
};
