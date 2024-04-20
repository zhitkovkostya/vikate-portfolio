import { Sticker } from "@/components/sticker"
import { Props } from "./types"

export const WorkSticker = ({title, imageUrl}: Props) => {
  return (
    <Sticker title={title} imageUrl={imageUrl} />
  )
}