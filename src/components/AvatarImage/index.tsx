import API from "@/services/API";
import AvatarImageProps from "@/types/avatarImageProps";

export const AvatarImage = ({ user_id, ...props }: AvatarImageProps) => {
  const uri = API.getUri();
  const image_uri = `${uri}/images/get-avatar/${user_id}`;
  if (props.thumbnail) {
    image_uri.concat(`?thumbnail=${props.thumbnail}`);
  }

  return <img src={image_uri} {...props} />;
};
