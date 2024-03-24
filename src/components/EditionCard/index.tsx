import { TagIcon } from "@/assets/TagIcon";
import { EditionStatus } from "@/types/editionStatus";
import { Link } from "react-router-dom";

export default function EditionCard({
  _id,
  edition_num,
  edition_name,
  status,
  edition_date,
  cover,
}) {
  return (
    <div
      id="container"
      className="mx-auto bg-gray-50 rounded-md hover:shadow-xl"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="p-2">
          <img
            alt={`Edition ${edition_num} Cover`}
            className="w-full h-64 object-cover object-center rounded-lg"
            height="400"
            src="https://placehold.co/600x400"
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width="600"
          />
          <h3 className="text-xl font-bold mb-2 mt-4">
            Edition {edition_num} : {edition_name}
          </h3>
          <span
            className={`px-2 py-1 inline-block rounded-md ${EditionStatus[status]}`}
          >
            <TagIcon className="w-4 h-4 inline max-lg:hidden mr-1 size-min" />
            {EditionStatus[status]}
          </span>
          <p className="text-zinc-500 dark:text-zinc-400">
            Last Updated/Published on: {edition_date}
          </p>
          <Link
            className="text-blue-500 hover:text-blue-700 mt-4"
            to={`/edition/update-edition/${_id}`}
          >
            Go to Edition
          </Link>
        </div>
      </div>
    </div>
  );
}
