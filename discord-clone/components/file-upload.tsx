"use client";

import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";

interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
  value: string;
  onChange: (url?: string) => void;
}
const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="upload" className="rounded-full" />

        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white- p-1 rounded-full absolute right-0 shadow-sm"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
