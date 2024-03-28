/// Either set "true" to use default thumbnail or specify a dimension to generate thumbnail
export type Thumbnail = boolean | number;

interface NixImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  image_id: string;
  thumbnail?: Thumbnail;
  force_refresh?: boolean;
}

export default NixImageProps;
