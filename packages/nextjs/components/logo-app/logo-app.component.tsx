"use client";

import Link from "next/link";
import { Badge } from "../ui/badge";
import { PushLogoIcon } from "~~/icons";

export function LogoApp() {
  return (
    <Link className="relative flex items-center text-xl" href="/">
      <PushLogoIcon className="w-auto m-3 h-9" />
      <Badge className="bottom-0 right-0 text-xs text-white bg-slate-50/20">LATAM</Badge>
    </Link>
  );
}
