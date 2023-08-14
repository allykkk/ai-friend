"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react" ;

const ImageUpload = ({ value, onChange, disabled }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // server side
  if (!isMounted) return null;
  
  // client side
  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
      onUpload={(result)=>onChange(result.info.secure_url)}
        options={{ maxFiles: 1 }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET}
      >
        <div className="p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col items-center justify-center">
            <div className="relative h-40 w-40">
              {value && <Image fill alt="Upload" src={value} className="rounded-lg object-cover" />}
              {!value && <ImageIcon size="icon" className="rounded-lg object-cover opacity-10"/>}
            </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
