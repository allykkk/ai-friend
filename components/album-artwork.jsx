import Image from "next/image";

import { cn } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

import { MoreVertical, MoreVerticalIcon} from "lucide-react";
import { Button } from "./ui/button";


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
      <div className="flex justify-between">
        <div className="space-y-1 text-sm">
          <h3 className="font-medium text-slate-900 leading-none">
            {album.name}
          </h3>
          <p className="text-xs text-slate-400">{album.description}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><MoreVerticalIcon/></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <Link href={`/character/${album.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <Link href={`/character/${album.id}`}>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Share...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
