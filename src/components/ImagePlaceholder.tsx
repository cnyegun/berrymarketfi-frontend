/**
 * Swappable image slot. While `src` is null it shows a labeled placeholder;
 * pass a real image path (e.g. "/steps/find-spot.png") to drop in artwork.
 */
type Props = {
  src?: string | null;
  label: string;
  contain?: boolean;
  className?: string;
};

export default function ImagePlaceholder({ src, label, contain = false, className = "" }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={label}
        className={`h-full w-full ${contain ? "object-contain" : "object-cover"} ${className}`}
      />
    );
  }
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#eef4ee_0%,#ffffff_50%,#e8f1ea_100%)] ${className}`}
    >
      <img src="/favicon.png" alt="" className="h-7 w-7 opacity-40" />
      <span className="px-3 text-center text-[9px] font-semibold uppercase tracking-[0.16em] text-brand/60">
        {label}
      </span>
    </div>
  );
}
