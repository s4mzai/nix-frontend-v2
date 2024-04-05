interface PaginationProps<T> {
  filtered_content: T[];
  current_page: number;
  per_page: number;
  handlePageChange: (newPage: number) => void;
  max_pages_to_show?: number;
}

export default function Pagination<T>({
  filtered_content,
  current_page,
  per_page,
  handlePageChange,
  max_pages_to_show = 5,
}: PaginationProps<T>) {
  if (filtered_content.length === 0) {
    return <></>;
  }
  const totalPages = Math.ceil(filtered_content.length / per_page);

  const isFirstPage = current_page === 1;
  const isLastPage = current_page === totalPages || totalPages === 0;

  const half_pager_length = Math.floor(max_pages_to_show / 2);

  const endIndex = Math.min(
    Math.max(max_pages_to_show, current_page + half_pager_length),
    totalPages,
  );
  let startIndex = Math.max(1, current_page - half_pager_length);
  if (endIndex - startIndex + 1 < max_pages_to_show) {
    startIndex = Math.max(1, endIndex - max_pages_to_show + 1);
  }

  const pages = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, index) => startIndex + index,
  );
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => !isFirstPage && handlePageChange(current_page - 1)}
        disabled={isFirstPage}
        className={`px-3 py-1 rounded-md border ${
          isFirstPage
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : "bg-white text-gray-700"
        }`}
      >
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded-md border ${
            current_page === page
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => !isLastPage && handlePageChange(current_page + 1)}
        disabled={isLastPage}
        className={`px-3 py-1 rounded-md border ${
          isLastPage
            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
            : "bg-white text-gray-700"
        }`}
      >
        Next
      </button>
    </div>
  );
}
