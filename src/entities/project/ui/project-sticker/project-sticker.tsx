import { Sticker } from "@/components/sticker"
import { Props } from "./types"

export const ProjectSticker = ({path, title, image}: Props) => (
  <Sticker
    path={path}
    title={title}
    imageUrl={image.url}
    width={image.width}
    height={image.height}
  />
);