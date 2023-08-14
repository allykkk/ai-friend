"use client";

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

import axios from "axios";

import { MoreVertical, MoreVerticalIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "./ui/dialog";
import { Input } from "./ui/input";

// Taken from shadcn example github with slight modifications to fit our needs.
const AlbumArtwork = ({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}) => {
  // Get hooks here, use in onSubmit
  const router = useRouter();

  // Our onSubmit handler here
  const onSubmit = async (values) => {
    try {
      //
      console.log("Got album", album);
      await axios.delete(`/api/character/${album.id}`);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(album);
      console.log(
        `Failed to submit with status code ${error.response.status} - ${error.response.data}`
      );
    }
  };

  return (
    <Dialog>
      <div className={cn("space-y-3", className)} {...props}>
        <div className="overflow-hidden rounded-md">
          <Link className="space-y-3" href={`/chat/${album.id}`}>
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
          </Link>
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
              <Button variant="ghost" size="icon">
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <Link href={`/character/${album.id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={onSubmit}>Delete</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger>Share...</DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>


      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share the love</DialogTitle>
          <DialogDescription>
            Anyone with the link can view this document.
            <div className="flex flex-row py-4 gap-x-4">
            <Input placeholder="bestie@ai-friend.com"/>
            <Button>Share</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AlbumArtwork;
