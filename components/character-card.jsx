"use client";

import Image from "next/image";
import { Card, CardHeader } from "./ui/card";
import Link from "next/link";
import AlbumArtwork from "./album-artwork";
import { XCircleIcon } from "lucide-react";


const CharacterCards = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <XCircleIcon className="h-60 w-60 opacity-30"/>
          {/* <Image fill className="grayscale" src="/empty.png" alt="Empty" /> */}
        </div>
        <p className="text-sm text-muted-foreground">No characters found.</p>
      </div>
    );
  }
  
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 pb-10 ">
      {data.map((item) => (

          <AlbumArtwork
            key={item.id}
            album={item}
            className="w-[200px]"
            aspectRatio="square"
            width={200}
            height={200}
          />

      ))}
    </div>
  );
};

export default CharacterCards;
