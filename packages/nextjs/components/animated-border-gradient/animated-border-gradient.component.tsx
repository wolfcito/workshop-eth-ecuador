export function CardAnimatedBorderGradient({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="relative h-[264px] w-[176px] overflow-hidden rounded-xl border border-[#8B43EE] p-[0.5px] backdrop-blur-3xl hover:border-2">
      <span className="absolute inset-[-1000%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F424C6_0%,#8B43EE_50%,#000000_100%)]" />
      <div className="inline-flex items-center justify-center w-full h-full px-3 py-1 text-sm font-medium rounded-xl bg-gray-950 text-gray-50 backdrop-blur-3xl" />
      <div className="absolute inset-0 items-center p-1">{children}</div>
    </div>
  );
}
