import { Image } from "antd";
import React from "react";

interface Props {
  width?: number | string;
  height?: number | string;
  photoUrl?: string;
  isHidden?: boolean;
}
const ImagesComponents = (props: Props) => {
  const { width, height, photoUrl, isHidden } = props;
  return (
    <>
      <Image
        width={width ?? '100%'
        }
        className="object-cover"
        src={photoUrl}
        height={height ?? "100%"}
        hidden={isHidden}
      />
    </>
  );
};

export default ImagesComponents;
