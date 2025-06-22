import { Sticker } from "@/components/sticker"
import { Props } from "./types"

export const WorkSticker = ({title, image}: Props) => {
  return (
    <Sticker title={title} imageUrl={image.url} width={image.width} height={image.height} />
  )
}