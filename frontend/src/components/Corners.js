export default function Corners({ className = "border-emerald-400/50", size = "h-2.5 w-2.5" }) {
  return (
    <>
      <span className={`pointer-events-none absolute left-0 top-0 border-l border-t ${size} ${className}`} />
      <span className={`pointer-events-none absolute right-0 top-0 border-r border-t ${size} ${className}`} />
      <span className={`pointer-events-none absolute bottom-0 left-0 border-b border-l ${size} ${className}`} />
      <span className={`pointer-events-none absolute bottom-0 right-0 border-b border-r ${size} ${className}`} />
    </>
  );
}
