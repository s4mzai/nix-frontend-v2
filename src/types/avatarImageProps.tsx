import { Thumbnail } from "./nixImageProps";

interface AvatarImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  user_id: string;
  thumbnail?: Thumbnail;
  force_refresh?: boolean;
}

export default AvatarImageProps;
