"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon } from "@heroicons/react/24/outline";
import { LinkPink } from "~~/components/link-pink";
import { Address } from "~~/components/scaffold-eth";
import { XIcon } from "~~/icons";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex flex-col items-center flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block mb-2 text-2xl">Workshop</span>
            <span className="block text-4xl font-bold">Añadiendo Visibilidad a tu Blockchain</span>
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <p className="my-2 font-medium">Dirección Wallet conectada:</p>
            <Address address={connectedAddress} />
          </div>

          <div className="flex items-center justify-center mt-10 gap-x-6">
            {socials.map(item => (
              <LinkPink key={item.href} href={item.href} icon={item.icon}>
                {item.children}
              </LinkPink>
            ))}
          </div>

          {/* <p className="text-lg text-center">
            Get started by editing{" "}
            <code className="inline-block max-w-full text-base italic font-bold break-words break-all bg-base-300">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-lg text-center">
            Edit your smart contract{" "}
            <code className="inline-block max-w-full text-base italic font-bold break-words break-all bg-base-300">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="inline-block max-w-full text-base italic font-bold break-words break-all bg-base-300">
              packages/hardhat/contracts
            </code>
          </p> */}
        </div>

        <div className="flex-grow w-full px-8 py-12 mt-16 bg-base-300">
          <div className="flex flex-col items-center justify-center gap-12 sm:flex-row">
            <div className="flex flex-col items-center max-w-xs px-10 py-10 text-center bg-base-100 rounded-3xl">
              <BugAntIcon className="w-8 h-8 fill-secondary" />
              <p>
                Juega con tu contrato inteligente usando la pestaña:
                <br />
                <Link href="/debug" passHref className="link">
                  Interactuar con tus Contratos
                </Link>
              </p>
            </div>
            {/* <div className="flex flex-col items-center max-w-xs px-10 py-10 text-center bg-base-100 rounded-3xl">
              <MagnifyingGlassIcon className="w-8 h-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

const socials = [
  // {
  //   href: "https://discord.gg/kSg6VDbx",
  //   children: <DiscordIcon classname="fill-white hover:fill-[#F424C6]" />,
  //   icon: false,
  // },
  {
    href: "https://twitter.com/PushEnEspanol",
    children: <XIcon />,
    icon: false,
  },
  // {
  //   href: "https://app.push.org/channels/0xB88460Bb2696CAb9D66013A05dFF29a28330689D",
  //   children: "Dale Opt-In",
  //   icon: true,
  // },
];

export default Home;
