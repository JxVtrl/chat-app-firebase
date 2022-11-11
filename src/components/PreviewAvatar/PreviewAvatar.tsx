import React, { useState } from "react";
import { Avatar } from "@chakra-ui/react";

interface iPreview {
    file: File;
}

export const PreviewAvatar: React.FC<iPreview> = ({ file }) => {
  const [preview, setPreview] = useState<any>(null);

  const reader = new FileReader();
  reader.onload = () => {
      setPreview({file: reader.result});
    };
    reader.readAsDataURL(file);

  return <Avatar src={preview} name="avatar" />;
};
