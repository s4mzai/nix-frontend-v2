import API from "@/services/API";
import AvatarImageProps from "@/types/avatarImageProps";

export const AvatarImage = ({ user_id, ...props }: AvatarImageProps) => {
  const uri = API.getUri();
  let image_uri = `${uri}/images/get-avatar/${user_id}`;
  if (props.thumbnail) {
    image_uri = image_uri.concat(`?thumbnail=${props.thumbnail}`);
    if (props.force_refresh) {
      image_uri = image_uri.concat(`&t=${new Date().getTime()}`);
    }
  } else if (props.force_refresh) {
    image_uri = image_uri.concat(`?t=${new Date().getTime()}`);
  }

  return <img src={image_uri} {...props} />;
};
