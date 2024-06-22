import { PushAPI } from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { getPublicClient } from "@wagmi/core";
import * as dotenv from "dotenv";
import { Hash, SendTransactionParameters, WalletClient } from "viem";
import { useWalletClient } from "wagmi";
import { getSigner } from "~~/lib/notifications.lib";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import {
  getBlockExplorerTxInternalTXLink,
  getBlockExplorerTxLink,
  getParsedError,
  notification,
} from "~~/utils/scaffold-eth";
import { TransactorFuncOptions } from "~~/utils/scaffold-eth/contract";

dotenv.config();

type TransactionFunc = (
  tx: (() => Promise<Hash>) | SendTransactionParameters,
  options?: TransactorFuncOptions,
) => Promise<Hash | undefined>;

/**
 * Custom notification content for TXs.
 */
const TxnNotification = ({ message, blockExplorerLink }: { message: string; blockExplorerLink?: string }) => {
  return (
    <div className={`flex flex-col ml-1 cursor-default`}>
      <p className="my-0">{message}</p>
      {blockExplorerLink && blockExplorerLink.length > 0 ? (
        <a href={blockExplorerLink} target="_blank" rel="noreferrer" className="block link text-md">
          check out transaction
        </a>
      ) : null}
    </div>
  );
};

/**
 * Runs Transaction passed in to returned function showing UI feedback.
 * @param _walletClient - Optional wallet client to use. If not provided, will use the one from useWalletClient.
 * @returns function that takes in transaction function as callback, shows UI feedback for transaction and returns a promise of the transaction hash
 */
export const useTransactor = (_walletClient?: WalletClient): TransactionFunc => {
  let walletClient = _walletClient;
  const { data } = useWalletClient();
  if (walletClient === undefined && data) {
    walletClient = data;
  }

  const result: TransactionFunc = async (tx, options) => {
    if (!walletClient) {
      notification.error("Cannot access account");
      console.error("⚡️ ~ file: useTransactor.tsx ~ error");
      return;
    }

    let notificationId = null;
    let transactionHash: Hash | undefined = undefined;
    try {
      const network = await walletClient.getChainId();
      // Get full transaction from public client
      const publicClient = getPublicClient(wagmiConfig);

      notificationId = notification.loading(<TxnNotification message="Awaiting for user confirmation" />);
      if (typeof tx === "function") {
        // Tx is already prepared by the caller
        const result = await tx();
        transactionHash = result;
      } else if (tx != null) {
        transactionHash = await walletClient.sendTransaction(tx);
      } else {
        throw new Error("Incorrect transaction passed to transactor");
      }
      notification.remove(notificationId);

      const blockExplorerTxURL = network ? getBlockExplorerTxLink(network, transactionHash) : "";
      const blockExplorerInternalTxURL = network ? getBlockExplorerTxInternalTXLink(network, transactionHash) : "";

      notificationId = notification.loading(
        <TxnNotification message="Waiting for transaction to complete." blockExplorerLink={blockExplorerTxURL} />,
      );

      const transactionReceipt = await publicClient.waitForTransactionReceipt({
        hash: transactionHash,
        confirmations: options?.blockConfirmations,
      });
      notification.remove(notificationId);

      notification.success(
        <TxnNotification message="Transaction completed successfully!" blockExplorerLink={blockExplorerTxURL} />,
        {
          icon: "🎉",
        },
      );
      console.log("blockExplorerTxURL", blockExplorerTxURL);
      console.log("blockExplorerInternalTxURL", blockExplorerInternalTxURL);

      await sendPushNotifications(blockExplorerInternalTxURL);

      notification.success(
        <TxnNotification
          message="Notificación enviada correctamente!"
          blockExplorerLink={blockExplorerInternalTxURL}
        />,
        {
          icon: "🎉",
        },
      );
      if (options?.onBlockConfirmation) options.onBlockConfirmation(transactionReceipt);
    } catch (error: any) {
      if (notificationId) {
        notification.remove(notificationId);
      }
      console.error("⚡️ ~ file: useTransactor.ts ~ error", error);
      const message = getParsedError(error);
      notification.error(message);
      throw error;
    }

    return transactionHash;
  };

  return result;
};

const sendPushNotifications = async (blockExplorerInternalTxURL: string) => {
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

export type AddressProp = `0x${string}`;
