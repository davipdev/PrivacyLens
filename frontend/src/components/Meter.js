export default function Meter({
  value,
  segments = 24,
  fill = "bg-emerald-400",
  track = "bg-white/[0.07]",
  height = "h-7",
}) {
  const filled = Math.round((value / 100) * segments);
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: segments }).map((_, i) => (
        <span
          key={i}
          className={`${height} flex-1 ${i < filled ? fill : track}`}
        />
      ))}
    </div>
  );
}
