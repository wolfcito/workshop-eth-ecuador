import Image from "next/image";
import { CardAnimatedBorderGradient } from "../animated-border-gradient";

export function AmbassadorCard({ image }: { readonly image: string }) {
  return (
    <CardAnimatedBorderGradient>
      <div className="relative">
        <Image
          src={image}
          alt=""
          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
          width={100}
          height={100}
        />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
      </div>
    </CardAnimatedBorderGradient>
  );
}
