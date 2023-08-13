import Image from "next/image";

import { cn } from "@/lib/utils";


// Taken from shadcn example github with slight modifications to fit our needs.

export function AlbumArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
          <div className="overflow-hidden rounded-md">
            <Image
              src={album.src}
              alt={album.name}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium text-slate-900 leading-none">{album.name}</h3>
        <p className="text-xs text-slate-400">{album.description}</p>
      </div>
    </div>
  );
}
