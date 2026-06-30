import { MagnifierEye } from "@/components/Icons";

export default function Logo({ className = "", showText = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-[3px] bg-emerald-400 text-emerald-950">
        <MagnifierEye className="h-[18px] w-[18px]" />
      </span>
      {showText && (
        <span className="text-[15px] font-semibold tracking-tight text-white">
          Privacy<span className="text-emerald-400">Lens</span>
        </span>
      )}
    </span>
  );
}
