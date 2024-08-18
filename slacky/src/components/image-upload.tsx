import Image from "next/image";
import { ImCancelCircle } from "react-icons/im";

import { UploadDropzone } from "@/lib/uploadthing";
import { useCreateWorkspaceValues } from "@/hooks/use-create-workspace-values";

export const ImageUpload = () => {
  const { imageUrl, updateImageUrl } = useCreateWorkspaceValues();

  if (imageUrl) {
    return (
      <div className="flex items-center justify-center h-32 w-32 relative">
        <Image
          src={imageUrl}
          className="object-cover w-full h-full rounded-t-md"
          alt="workspace image"
          width={320}
          height={320}
        />

        <ImCancelCircle
          size={30}
          onClick={() => updateImageUrl("")}
          className="absolute cursor-pointer -right-2 -top-2 z-10 hover:scale-110"
        />
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint="workspaceImage"
      onClientUploadComplete={(file) => updateImageUrl(file[0].url)}
      onUploadError={(error) =>
        console.log("[ERROR_WHILE_UPLOADING_FILE]", error)
      }
    />
  );
};
