import Link from "next/link";
import { LinkPinkProps } from "./link-pink.type";

export function LinkPink({ href, children, icon = true }: LinkPinkProps) {
  return (
    <Link href={href} target="_blank" className="cursor-pointer  hover:text-[#fe82e3]">
      {children} {icon ? <span aria-hidden="true">→</span> : null}
    </Link>
  );
}
