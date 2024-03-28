import { Thumbnail } from "./nixImageProps";

interface AvatarImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  user_id: string;
  thumbnail?: Thumbnail;
}

export default AvatarImageProps;
