import { TagIcon } from "@/assets/TagIcon";
import API from "@/services/API";
import { Edition } from "@/types/edition";
import { EditionStatus } from "@/types/editionStatus";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "../Spinner";

export default function EditionCard({ edition }: { edition: Edition }) {
  const [image, setImage] = useState<ArrayBuffer | string>(null);
  useEffect(() => {
    const imageEndPoint = `/images/get/edition-${edition.edition_id}?thumbnail=512`;
    API.get(imageEndPoint, { responseType: "arraybuffer" }).then((response) => {
      const imageBlob = new Blob([response.data], { type: "image/png" });
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result;
        setImage(imageDataUrl);
      };
      reader.readAsDataURL(imageBlob);
    });
    // todo: handle error possibly by adding a red cross?
  });
  // edition cover will be dervied from edition._id only, so no need to pass it as prop
  return (
    <Link
      to={`/edition/update-edition/${edition._id}`}
      // pass state to prevent unnecessary server calls
      state={{ edition }}
    >
      <div
        id="container"
        className="mx-auto bg-gray-50 rounded-md hover:shadow-xl"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="p-2">
            {image === null ? (
              <div className="w-[600px] h-[400px]">
                <Spinner />
              </div>
            ) : (
              <img
                alt={`Edition ${edition.edition_id} Cover`}
                className="w-full h-64 object-cover object-center rounded-lg"
                height="400"
                src={image as string}
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                width="600"
              />
            )}
            <h3 className="text-xl font-bold mb-2 mt-4">
              Edition {edition.edition_id} : {edition.name}
            </h3>
            <span
              className={`px-2 py-1 inline-block rounded-md ${EditionStatus[edition.status]}`}
            >
              <TagIcon className="w-4 h-4 inline max-lg:hidden mr-1 size-min" />
              {EditionStatus[edition.status]}
            </span>
            <p className="text-zinc-500 dark:text-zinc-400 py-2">
              {edition.published_at ? "Published on" : "Last Updated"}
              {": "}
              {new Date(
                edition.published_at || edition.updatedAt,
              ).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
