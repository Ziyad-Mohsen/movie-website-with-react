import clsx from "clsx";
import defaultImg from "../../../assets/user-img.jpg";

type AvatarProps = {
  src: string | null;
  alt?: string;
  size?: AvatarSize;
  className?: string;
};

type AvatarSize = "sm" | "md" | "lg" | "xl";

const sizeMap: { sm: string; md: string; lg: string; xl: string } = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32",
};

function Avatar({ src, alt = "", size = "md", className = "" }: AvatarProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full overflow-hidden bg-neutral-gray",
        sizeMap[size],
        className
      )}
    >
      <img
        className="w-full h-full object-cover"
        src={src ? src : defaultImg}
        alt={alt}
      />
    </div>
  );
}

export default Avatar;
