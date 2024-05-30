import { Wallet } from "ethers";

export const getSigner = (delegate: string) => {
  if (!delegate) {
    console.error("delegate env var is invalid or missing. You can either add a valid one");
    return undefined;
  }
  return new Wallet(`0x${delegate}`);
};
